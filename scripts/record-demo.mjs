import { chromium } from "@playwright/test";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const recordingsDir = path.resolve("./recordings");
if (!fs.existsSync(recordingsDir)) {
  fs.mkdirSync(recordingsDir, { recursive: true });
}

console.log("==================================================");
console.log("  Launching Full Utsav Playwright Video Recording ");
console.log("==================================================");

const browser = await chromium.launch({
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--no-sandbox"],
});

const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: {
    dir: recordingsDir,
    size: { width: 1280, height: 720 },
  },
});

const page = await context.newPage();

async function delay(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

try {
  // ----------------------------------------------------
  // 1. Landing Page Showcase
  // ----------------------------------------------------
  console.log("1. Visiting landing page at http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await delay(2500);

  // Smooth scroll down to highlight landing page features and demo strands
  console.log("   Showcasing landing page features & serial lights...");
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: "smooth" }));
  await delay(2000);
  await page.evaluate(() => window.scrollBy({ top: 450, behavior: "smooth" }));
  await delay(2000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await delay(1500);

  // ----------------------------------------------------
  // 2. Wizard: Step 1 (Event Type)
  // ----------------------------------------------------
  console.log("2. Navigating to New Plan Wizard...");
  const newPlanLink = page.getByRole("link", { name: /new plan/i }).first();
  await newPlanLink.click();
  await page.waitForURL("**/plan/new");
  await delay(1500);

  console.log("   Selecting Wedding celebration...");
  await page.locator('input[type="radio"][value="wedding"]').check();
  await delay(1200);

  const nextBtn1 = page.getByRole("button", { name: /next/i });
  await nextBtn1.click();
  await delay(1500);

  // ----------------------------------------------------
  // 3. Wizard: Step 2 (Functions Selection)
  // ----------------------------------------------------
  console.log("3. Step 2: Reviewing Indian wedding functions...");
  await delay(2000);

  const nextBtn2 = page.getByRole("button", { name: /next/i });
  await nextBtn2.click();
  await delay(1500);

  // ----------------------------------------------------
  // 4. Wizard: Step 3 (Celebration Details)
  // ----------------------------------------------------
  console.log("4. Step 3: Entering celebration parameters...");
  await page.locator("#f-title").pressSequentially("Ananya & Rohan's Royal Wedding", { delay: 35 });
  await delay(600);

  await page.locator("#f-city").pressSequentially("Jaipur", { delay: 40 });
  await delay(600);

  const future = new Date();
  future.setMonth(future.getMonth() + 4);
  const futureStr = future.toISOString().slice(0, 10);
  await page.locator("#f-date").fill(futureStr);
  await delay(600);

  await page.locator("#f-guests").fill("350");
  await delay(600);

  await page.locator("#f-budget").pressSequentially("1500000", { delay: 30 });
  await delay(600);

  await page
    .locator("#f-vibe")
    .pressSequentially("Royal Rajasthani heritage palace celebration with marigold decor", {
      delay: 25,
    });
  await delay(1200);

  // ----------------------------------------------------
  // 5. Creating Plan
  // ----------------------------------------------------
  console.log("5. Submitting form to assemble AI celebration plan...");
  const submitBtn = page.getByRole("button", { name: /create my plan/i });
  await submitBtn.click();

  await page.waitForURL(/\/plan\/[a-f0-9-]+/, { timeout: 25000 });
  console.log("   Plan created! Reached Dashboard at:", page.url());
  await delay(3000);

  // ----------------------------------------------------
  // 6. Dashboard: Overview Tab
  // ----------------------------------------------------
  console.log("6. Showcasing Dashboard Overview...");
  await page.evaluate(() => window.scrollBy({ top: 350, behavior: "smooth" }));
  await delay(2500);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await delay(1500);

  // ----------------------------------------------------
  // 7. Dashboard: Budget Tab
  // ----------------------------------------------------
  console.log("7. Visiting Budget Tab (Exact Rupee Math)...");
  const budgetTab = page.locator("#tab-budget, button[role='tab']:has-text('Budget')").first();
  if (await budgetTab.isVisible()) {
    await budgetTab.click();
    await delay(2500);
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
    await delay(2000);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await delay(1200);
  }

  // ----------------------------------------------------
  // 8. Dashboard: Timeline Tab
  // ----------------------------------------------------
  console.log("8. Visiting Timeline Tab (Muhurat & Multi-day schedule)...");
  const timelineTab = page
    .locator("#tab-timeline, button[role='tab']:has-text('Timeline')")
    .first();
  if (await timelineTab.isVisible()) {
    await timelineTab.click();
    await delay(2500);
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
    await delay(2000);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await delay(1200);
  }

  // ----------------------------------------------------
  // 9. Dashboard: Vendors Tab
  // ----------------------------------------------------
  console.log("9. Visiting Vendors Tab (Checklists & Contacts)...");
  const vendorsTab = page.locator("#tab-vendors, button[role='tab']:has-text('Vendors')").first();
  if (await vendorsTab.isVisible()) {
    await vendorsTab.click();
    await delay(2500);
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
    await delay(2000);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await delay(1200);
  }

  // ----------------------------------------------------
  // 10. Dashboard: Ideas Tab
  // ----------------------------------------------------
  console.log("10. Visiting Ideas Tab (Grounding & Cultural Themes)...");
  const ideasTab = page.locator("#tab-ideas, button[role='tab']:has-text('Ideas')").first();
  if (await ideasTab.isVisible()) {
    await ideasTab.click();
    await delay(2500);
    await page.evaluate(() => window.scrollBy({ top: 250, behavior: "smooth" }));
    await delay(2000);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await delay(1200);
  }

  // ----------------------------------------------------
  // 11. Dashboard: Guests Tab
  // ----------------------------------------------------
  console.log("11. Visiting Guests Tab...");
  const guestsTab = page.locator("#tab-guests, button[role='tab']:has-text('Guests')").first();
  if (await guestsTab.isVisible()) {
    await guestsTab.click();
    await delay(2500);
  }

  // ----------------------------------------------------
  // 12. Interactive GenAI Planning Assistant
  // ----------------------------------------------------
  console.log("12. Engaging GenAI Planning Assistant...");
  const assistantBtn = page.locator("button:has-text('Assistant')").first();
  if (await assistantBtn.isVisible()) {
    await assistantBtn.click();
    await delay(2000);

    const assistantInput = page.locator("#assistant-input");
    if (await assistantInput.isVisible()) {
      await assistantInput.click();
      await assistantInput.pressSequentially("Suggest ideas to welcome guests at Jaipur airport.", {
        delay: 30,
      });
      await delay(1200);

      const sendBtn = page.locator("button[type='submit']:has-text('Send')").first();
      if (await sendBtn.isVisible()) {
        await sendBtn.click();
        await delay(4500);
      }
    }
  }

  // ----------------------------------------------------
  // 13. Pan-Indian Localization Demo
  // ----------------------------------------------------
  console.log("13. Demonstrating Pan-Indian Localization...");
  const langSelect = page
    .locator("label.lang-switch select, select[aria-label='Language']")
    .first();
  if (await langSelect.isVisible()) {
    // Switch to Hindi
    console.log("    -> Switching to हिन्दी (Hindi)...");
    await langSelect.selectOption("hi");
    await delay(2500);

    // Switch to Tamil
    console.log("    -> Switching to தமிழ் (Tamil)...");
    await langSelect.selectOption("ta");
    await delay(2500);

    // Switch to Telugu
    console.log("    -> Switching to తెలుగు (Telugu)...");
    await langSelect.selectOption("te");
    await delay(2500);

    // Switch back to English
    console.log("    -> Switching back to English...");
    await langSelect.selectOption("en");
    await delay(2000);
  }

  console.log("Demo walkthrough completed successfully!");
} catch (err) {
  console.error("Recording error:", err);
} finally {
  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    console.log("Raw video recorded at:", videoPath);
    const finalMp4 = path.join(recordingsDir, "utsav-demo.mp4");
    try {
      console.log("Transcoding to MP4 with FFmpeg...");
      execSync(
        `ffmpeg -y -i "${videoPath}" -c:v libx264 -preset fast -crf 22 -c:a aac "${finalMp4}"`,
        {
          stdio: "inherit",
        },
      );
      console.log("SUCCESS! MP4 video ready at:", finalMp4);
    } catch (e) {
      console.warn("FFmpeg transcoding note:", e.message);
    }
  }
}
