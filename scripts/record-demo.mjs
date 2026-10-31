import { chromium } from "@playwright/test";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const recordingsDir = path.resolve("./recordings");
if (!fs.existsSync(recordingsDir)) {
  fs.mkdirSync(recordingsDir, { recursive: true });
}

console.log("Starting Playwright demo recording against http://localhost:3000...");

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
  // 1. Landing Page Showcase
  console.log("Navigating to landing page...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await delay(3000);

  // 2. Describe Input
  console.log("Typing prompt into describe box...");
  const describeBox = page.locator("#describe");
  if (await describeBox.isVisible()) {
    await describeBox.click();
    await describeBox.pressSequentially(
      "My sister's wedding in Jaipur next February, 350 guests, 15 lakh budget, pure veg",
      { delay: 40 }
    );
    await delay(1200);

    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.click();
    await delay(3000);
  }

  // 3. Wizard Steps (if on wizard)
  if (page.url().includes("/plan/new")) {
    console.log("Stepping through wizard...");
    const nextBtn = page.getByRole("button", { name: /next/i });
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await delay(1500);
    }
    const nextBtn2 = page.getByRole("button", { name: /next/i });
    if (await nextBtn2.isVisible()) {
      await nextBtn2.click();
      await delay(1500);
    }

    const titleInput = page.getByLabel(/name of the celebration/i);
    if (await titleInput.isVisible()) {
      const val = await titleInput.inputValue();
      if (!val) await titleInput.fill("Ananya & Rohan");
    }

    const cityInput = page.getByLabel(/city or town/i);
    if (await cityInput.isVisible()) {
      const val = await cityInput.inputValue();
      if (!val) await cityInput.fill("Jaipur");
    }

    const dateInput = page.getByLabel(/main date/i);
    if (await dateInput.isVisible()) {
      const val = await dateInput.inputValue();
      if (!val) {
        const next = new Date();
        next.setMonth(next.getMonth() + 4);
        await dateInput.fill(next.toISOString().slice(0, 10));
      }
    }

    const guestsInput = page.getByLabel(/number of guests/i);
    if (await guestsInput.isVisible()) {
      const val = await guestsInput.inputValue();
      if (!val) await guestsInput.fill("350");
    }

    const budgetInput = page.getByLabel(/total budget/i);
    if (await budgetInput.isVisible()) {
      const val = await budgetInput.inputValue();
      if (!val) await budgetInput.fill("15 lakh");
    }

    await delay(1000);
    const createBtn = page.getByRole("button", { name: /create my plan/i });
    if (await createBtn.isVisible()) {
      await createBtn.click();
      console.log("Creating plan...");
      await page.waitForURL(/\/plan\//, { timeout: 35000 });
      await delay(2500);
    }
  }

  // 4. Dashboard Showcase
  console.log("Showcasing Dashboard overview...");
  await delay(3000);

  // Scroll smoothly down the overview
  await page.evaluate(() => window.scrollBy({ top: 350, behavior: "smooth" }));
  await delay(2000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await delay(1500);

  // 5. Budget Tab
  console.log("Visiting Budget tab...");
  const budgetTab = page.getByRole("tab", { name: /budget/i });
  if (await budgetTab.isVisible()) {
    await budgetTab.click();
    await delay(2500);
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
    await delay(2000);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await delay(1000);
  }

  // 6. Timeline Tab
  console.log("Visiting Timeline tab...");
  const timelineTab = page.getByRole("tab", { name: /timeline/i });
  if (await timelineTab.isVisible()) {
    await timelineTab.click();
    await delay(2500);
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
    await delay(2000);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await delay(1000);
  }

  // 7. Vendors Tab
  console.log("Visiting Vendors tab...");
  const vendorsTab = page.getByRole("tab", { name: /vendors/i });
  if (await vendorsTab.isVisible()) {
    await vendorsTab.click();
    await delay(2500);
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
    await delay(2000);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await delay(1000);
  }

  // 8. Ideas Tab
  console.log("Visiting Ideas tab...");
  const ideasTab = page.getByRole("tab", { name: /ideas/i });
  if (await ideasTab.isVisible()) {
    await ideasTab.click();
    await delay(2500);
    await page.evaluate(() => window.scrollBy({ top: 300, behavior: "smooth" }));
    await delay(2000);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    await delay(1000);
  }

  // 9. Guests Tab
  console.log("Visiting Guests tab...");
  const guestsTab = page.getByRole("tab", { name: /guests/i });
  if (await guestsTab.isVisible()) {
    await guestsTab.click();
    await delay(2500);
  }

  // 10. AI Assistant Chat
  console.log("Engaging Planning Assistant...");
  const assistantBtn = page.getByRole("button", { name: /assistant/i });
  if (await assistantBtn.isVisible()) {
    await assistantBtn.click();
    await delay(1500);
  }

  const assistantTextarea = page.locator("#assistant-input");
  if (await assistantTextarea.isVisible()) {
    await assistantTextarea.click();
    await assistantTextarea.pressSequentially("Suggest a grand royal theme for Reception.", { delay: 35 });
    await delay(1000);
    const sendBtn = page.locator('button[type="submit"]', { hasText: /send/i });
    if (await sendBtn.isVisible()) {
      await sendBtn.click();
      await delay(4000);
    }
  }

  // 11. Multi-Language Demonstrations
  console.log("Demonstrating multi-language localization...");
  const langSelect = page.locator("label.lang-switch select, select[aria-label='Language']");
  if (await langSelect.isVisible()) {
    // Hindi
    console.log("Switching to Hindi...");
    await langSelect.selectOption("hi");
    await delay(2500);

    // Tamil
    console.log("Switching to Tamil...");
    await langSelect.selectOption("ta");
    await delay(2500);

    // Telugu
    console.log("Switching to Telugu...");
    await langSelect.selectOption("te");
    await delay(2500);

    // Back to English
    console.log("Switching back to English...");
    await langSelect.selectOption("en");
    await delay(2000);
  }

  console.log("Recording complete. Finalizing video...");
} catch (err) {
  console.error("Recording step error:", err);
} finally {
  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  if (video) {
    const videoPath = await video.path();
    console.log("Video saved to:", videoPath);
    const finalMp4 = path.join(recordingsDir, "utsav-demo.mp4");
    try {
      console.log("Transcoding to MP4 with ffmpeg...");
      execSync(`ffmpeg -y -i "${videoPath}" -c:v libx264 -preset fast -crf 22 -c:a aac "${finalMp4}"`, {
        stdio: "inherit",
      });
      console.log("MP4 demo ready at:", finalMp4);
    } catch (e) {
      console.warn("Could not transcode with ffmpeg, keeping webm:", e.message);
    }
  }
}

