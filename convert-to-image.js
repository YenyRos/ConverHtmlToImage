const puppeteer = require('puppeteer');
const readfile = require('fs');

async function convertHTMLToImage(htmlFilePath, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 620,
    height: 450,
    deviceScaleFactor: 1,
  });

  //Lee el HTML content de la dirección dada
  const htmlContent = readfile.readFileSync(htmlFilePath, 'utf8');

  //setea HTML content
  await page.goto('about:blank');
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  await page.screenshot({ path: outputPath });

  //cierra browser
  await browser.close();

  console.log(`HTML converted to image: ${outputPath}`);
}

const htmlFilePath = './Ticket/Index.html';

//para cambiar la extension solo cambias el .png a .jpg
const outputImagePath = 'ticket-test-from-html.png';

convertHTMLToImage(htmlFilePath, outputImagePath);