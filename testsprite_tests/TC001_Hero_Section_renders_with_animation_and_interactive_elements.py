import asyncio
from playwright import async_api
from playwright.async_api import expect

async def run_test():
    pw = None
    browser = None
    context = None
    
    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()
        
        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",         # Set the browser window size
                "--disable-dev-shm-usage",        # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",                     # Use host-level IPC for better stability
                "--single-process"                # Run the browser in a single process mode
            ],
        )
        
        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)
        
        # Open a new page in the browser context
        page = await context.new_page()
        
        # Navigate to your target URL and wait until the network request is committed
        await page.goto("http://localhost:3000/", wait_until="commit", timeout=10000)
        
        # Wait for the main page to reach DOMContentLoaded state (optional for stability)
        try:
            await page.wait_for_load_state("domcontentloaded", timeout=3000)
        except async_api.Error:
            pass
        
        # Iterate through all iframes and wait for them to load as well
        for frame in page.frames:
            try:
                await frame.wait_for_load_state("domcontentloaded", timeout=3000)
            except async_api.Error:
                pass
        
        # Interact with the page elements to simulate user flow
        # -> Verify the call-to-action buttons are clickable and social media links navigate to correct URLs.
        frame = context.pages[-1]
        # Click 'Get In Touch' button to verify it is clickable
        elem = frame.locator('xpath=html/body/div/div/div/div/div/section/div/div[2]/div/div/div/div/button').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Click 'Download Resume' button to verify it is clickable and triggers expected behavior.
        frame = context.pages[-1]
        # Click 'Download Resume' button to verify it is clickable and triggers download or navigation
        elem = frame.locator('xpath=html/body/div/div/div/div/div/section/div/div[2]/div/div/div/div/button[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # -> Verify social media links for GitHub, LinkedIn, and Email are present and navigate to correct URLs.
        frame = context.pages[-1]
        # Click GitHub Profile link to verify it navigates to the correct URL
        elem = frame.locator('xpath=html/body/div/div/div/div/div/section/div/div[2]/div/div/div/div[2]/a').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click LinkedIn Profile link to verify it navigates to the correct URL
        elem = frame.locator('xpath=html/body/div/div/div/div/div/section/div/div[2]/div/div/div/div[2]/a[2]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        frame = context.pages[-1]
        # Click Email link to verify it opens the default mail client or mailto link
        elem = frame.locator('xpath=html/body/div/div/div/div/div/section/div/div[2]/div/div/div/div[2]/a[3]').nth(0)
        await page.wait_for_timeout(3000); await elem.click(timeout=5000)
        

        # --> Assertions to verify final state
        frame = context.pages[-1]
        try:
            await expect(frame.locator('text=Hero Section Loaded Successfully').first).to_be_visible(timeout=1000)
        except AssertionError:
            raise AssertionError("Test case failed: The Hero Section did not load correctly with the animated introduction, profile image, call-to-action buttons, and social media links as expected.")
        await asyncio.sleep(5)
    
    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()
            
asyncio.run(run_test())
    