(function () {
    document.addEventListener('DOMContentLoaded', (event) => {
        // const generateControlDigit = (barcode) => {
        //   let generatedControlDigit;

        //   let evenSum = 0;
        //   barcode.split('').map((item, idx) => {
        //     const isIdxEven = !Boolean((idx + 1) % 2);

        //     if (isIdxEven) {
        //       evenSum = evenSum + parseInt(item);
        //     }
        //   });
        //   evenSum = evenSum * 3;

        //   let oddSum = 0;
        //   barcode.split('').map((item, idx) => {
        //     const isIdxOdd = Boolean((idx + 1) % 2);

        //     if (isIdxOdd) {
        //       oddSum = oddSum + parseInt(item);
        //     }
        //   });

        //   generatedControlDigit = evenSum + oddSum;
        //   let generatedControlDigitArr = generatedControlDigit.toString().split('');
        //   generatedControlDigit = generatedControlDigitArr[generatedControlDigitArr.length - 1];
        //   generatedControlDigit = 10 - generatedControlDigit;
        //   return generatedControlDigit;
        // }

        let barcodes = [];
        let linkButton = document.getElementById('link');

        const form = document.querySelector('.mainForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            barcodes = [];

            const countryCode = e.target[0].value;
            const quantity = e.target[1].value;

            let barcodeContainer = document.querySelector('.barcodeContainer');
            barcodeContainer.innerHTML = '';
            for (let i = 0; i < quantity; i++) {
                let barcode = `${countryCode}`;

                let manufacturerСode = Math.floor(1000 + Math.random() * 9000);
                barcode += manufacturerСode;

                let productСode =
                    Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
                barcode += productСode;
                console.log('generated barcode =', barcode);

                let svgNode = `<svg id="barcode${i + 1}"></svg>`;
                barcodeContainer.innerHTML += svgNode;

                JsBarcode(`#barcode${i + 1}`, barcode, { format: 'ean13' });
                const generatedBarcode = document.getElementById(
                    `barcode${i + 1}`
                );
                barcodes.push(generatedBarcode);
            }

            linkButton.style.display = 'block';
        });

        linkButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Generating barcodes archive
            let zip = new JSZip();
            for (let i = 0; i < barcodes.length; i++) {
                const xmlSerializer = new XMLSerializer();
                let svg = xmlSerializer.serializeToString(barcodes[i]);

                // Append to ZIP
                zip.file(`barcode_${i + 1}.svg`, svg, { binary: false });
            }

            zip.generateAsync({ type: 'base64' }).then(
                (base64) => {
                    window.location = 'data:application/zip;base64,' + base64;
                },
                (err) => {
                    console.error(err);
                }
            );
        });
    });
})();
