async function runTest() {
  console.log("=== STEP 0: Reset Demo State ===");
  const resetRes = await fetch('http://localhost:3000/api/demo/reset', {
    method: 'POST'
  });
  const resetData = await resetRes.json();
  if (!resetRes.ok || !resetData.success) {
    console.error("Failed to reset demo state:", resetData);
    process.exit(1);
  }
  console.log("Demo state reset:", resetData.message);

  console.log("\n=== STEP 1: Search 'Cold Coffee' ===");
  const search1Res = await fetch('http://localhost:3000/api/products/search?q=Cold%20Coffee');
  const search1 = await search1Res.json();
  console.log(`Found ${search1.count} results:`);
  for (const item of search1.results) {
    console.log(`- Store: ${item.store.name.padEnd(25)} | Status: ${item.intelligence.status.padEnd(18)} | Conf: ${item.intelligence.confidence} | Reason: ${item.intelligence.reason}`);
  }

  const store3Before = search1.results.find(r => r.store.id === 'store-3');
  console.log("\nStore 3 (XYZ Daily Needs) status before confirmation:", store3Before?.intelligence?.status);
  console.log("Store 3 (XYZ Daily Needs) confidence before confirmation:", store3Before?.intelligence?.confidence);

  console.log("\n=== STEP 2: Fetch Store 3 Inventory Health ===");
  const healthRes = await fetch('http://localhost:3000/api/stores/store-3/inventory-health');
  const health = await healthRes.json();
  console.log("Health summary:", health.healthSummary);
  console.log("Action items count:", health.actionItems.length);
  const targetItem = health.actionItems.find(i => i.productId === 'prod-cold-coffee');
  console.log("Cold Coffee in Store Action Queue:", targetItem?.riskLevel, targetItem?.reason);

  console.log("\n=== STEP 3: Confirm Stock for Store 3 Cold Coffee ===");
  const confirmRes = await fetch('http://localhost:3000/api/store/confirm-stock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      storeId: 'store-3',
      productId: 'prod-cold-coffee',
      updatedStock: 25
    })
  });
  const confirmResult = await confirmRes.json();
  console.log("Confirm stock response:", confirmResult.success, confirmResult.message);
  console.log("New Status:", confirmResult.updatedRisk.status, "New Confidence:", confirmResult.updatedRisk.confidence);

  console.log("\n=== STEP 4: Re-Search 'Cold Coffee' (Customer View Verification) ===");
  const search2Res = await fetch('http://localhost:3000/api/products/search?q=Cold%20Coffee');
  const search2 = await search2Res.json();
  const store3After = search2.results.find(r => r.store.id === 'store-3');
  console.log("Store 3 (XYZ Daily Needs) status AFTER confirmation:", store3After?.intelligence?.status);
  console.log("Store 3 (XYZ Daily Needs) confidence AFTER confirmation:", store3After?.intelligence?.confidence);
  console.log("Store 3 reason:", store3After?.intelligence?.reason);

  console.log("\n=== STEP 5: Business Metrics & Case Signals ===");
  const metricsRes = await fetch('http://localhost:3000/api/business/metrics');
  const metrics = await metricsRes.json();
  console.log("Repeat Purchase Benchmark:", metrics.metrics.caseStudySignals.repeatPurchase.before + "% -> " + metrics.metrics.caseStudySignals.repeatPurchase.after + "%");
  console.log("Cancellation Rate Benchmark:", metrics.metrics.caseStudySignals.cancellationRate.before + "% -> " + metrics.metrics.caseStudySignals.cancellationRate.after + "%");
  console.log("Prototype Accuracy:", metrics.metrics.simulationMetrics.catalogAccuracyPercent + "%");
  console.log("Recent Audit Events:", metrics.metrics.simulationMetrics.auditLog.length);
  console.log("First Audit Event:", metrics.metrics.simulationMetrics.auditLog[0]);

  if (store3Before?.intelligence?.status === 'UNCERTAIN' && store3After?.intelligence?.status === 'HIGH_CONFIDENCE') {
    console.log("\n>>> SUCCESS: END-TO-END STATE CHANGE VERIFIED PERFECTLY! <<<");
  } else {
    console.error("\n>>> FAILED: State did not transition as expected! <<<");
    process.exit(1);
  }
}

runTest().catch(console.error);
