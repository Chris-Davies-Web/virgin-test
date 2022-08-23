/* Author: Chris Davies
 * Test: Virgin Media - Coding Test
 * Variation: 1
*/

// IIFE to scope the test
(() => {

    // Debug mode allowing for debug toggle when QAing the test
    const debugMode = 1;

    try {

        // Namespace the test
        document.documentElement.classList.add('VM-1');

        // Start the test
        const activate = () => {
            
            // Wait for the tile wrapper to be in the DOM
            waitForElement('.VM-1 vm-product-card-section', (tileWrapper) => {

                // Interval to keep changing the text on intial load 
                let count = 0;
                const maxCount = 100;
                const delay = 50;

                const interval = setInterval(() => {
                    // Update on every loop as the tiles re-render and change back to the original state
                    updateTiles(tileWrapper);

                    // Clear interval
                    if(count > maxCount){
                        clearInterval(interval)
                    }

                    // Increment count
                    count++

                }, delay)

                 // Updates when the tile components are re-rendered
                tileWrapper.addEventListener('click', () => {
                    updateTiles(tileWrapper);
                })
            })
        }

        // Loop through the tiles and run updateTextAndSetupModal function on each tile
        const updateTiles = (tileWrapper) => {
            // Get Tiles
            const tiles = tileWrapper.querySelectorAll('.tile');

            // Loop through tiles and update the activation text
            tiles.forEach(tile => {

                // Check if the tile has already been updated
                if(!tile.classList.contains('vm1-tile-text-updated')) {

                    // Update the tile text and set modal event listener
                    updateTextAndSetupModal(tile);
                    
                    // Add class to set tile as updated
                    tile.classList.add('vm1-tile-text-updated')
                }

            })
        }

        // Update the text in the given tile, then setup a click event listener to create the modal
        const updateTextAndSetupModal = (tile) => {

            // Replace text within the tile
            const tileTextElement = tile.querySelector('.bottom-wrapper p.price-container');
            const tileText = tileTextElement.innerText;
            const newText = tileText.replace('set up fee', 'activation fee');

            // Create Whats this link
            const whatsThisLink = document.createElement('vm-link');
            whatsThisLink.innerText = 'Whats This?'
            tileTextElement.innerText = newText;

            // Add link to the page
            tileTextElement.appendChild(whatsThisLink)

            // Add click event listener to open the modal
            whatsThisLink.addEventListener('click', () => {

                // Price Guide URL 
                const priceGuideLink = "https://www.virginmedia.com/legal/price-guides";

                // Create new modal elements
                const vmModal = document.createElement('vm-modal');

                // Namespace the modal to scope styles
                vmModal.classList.add('ng-star-inserted', 'vm1-modal');

                // Trigger functionality of modal depending on which element is clicked
                vmModal.addEventListener('click', (e) => {
                    const target = e.target;

                    // If the link is not clicked, stop the link activating
                    if(!target.classList.contains('price-guide-link')) {
                        e.preventDefault();
                    }

                    // If a close element is clicked, remove the modal
                    if(target.classList.contains('modal__close') || target.classList.contains('fa-times') || target.classList.contains('button--medium')){
                        vmModal.remove();
                    }
                })

                // Inner HTML to the modal
                vmModal.innerHTML = `
                    <div _ngcontent-hhi-c53="" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" class="modal modal--background">
                            <div _ngcontent-hhi-c53="" class="modal__margin modal--large">
                                <div _ngcontent-hhi-c53="" class="modal__container">
                                    <div _ngcontent-hhi-c53="" class="modal__header ng-star-inserted">
                                        <span _ngcontent-hhi-c53="" class="modal__close">
                                            <i _ngcontent-hhi-c53="" class="far fa-fw fa-times"></i>
                                        </span>
                                        <h4 _ngcontent-hhi-c53="">Activation Fee</h4>
                                    </div>
                                    <!---->
                                    <div _ngcontent-hhi-c53="" class="modal__body clear-bg">
                                        <p _ngcontent-hhi-c69="" class="margin-top text-modal">
                                            <div>
                                                <p>The activation fee is the charge for the work that goes on behind the scenes to get you connected to our network. This is a one-off charge and will be added to your first bill. For more information see out <a href="${priceGuideLink}" class="price-guide-link" target="_blank">price guides</a></p>
                                            </div>
                                        </p>
                                    </div>
                                    <div _ngcontent-hhi-c53="" class="modal__footer">
                                        <vm-button _ngcontent-hhi-c53="" _nghost-hhi-c33="" cy-data="vm-button-0" class="ng-star-inserted">
                                            <!----><!----><!---->
                                            <button _ngcontent-hhi-c33="" type="button" class="button button--medium button--tertiary ng-star-inserted">
                                                <!---->Ok <!---->
                                            </button>
                                            <!----><!----><!----><!----><!----><!----><!----><!----><!---->
                                        </vm-button>
                                    <!----><!----><!---->
                                    </div>
                                </div>
                            </div>
                        </div>
                `
                

                // Add the modal to the DOM
                const productCardSection = document.querySelector('vm-product-card-section');
                productCardSection.insertAdjacentElement('beforeend', vmModal)
            })
        }


        // Wait for Element utility function
        const waitForElement = (cssSelector, callback, multiElements, calls, time) => {

            let elementCached;
            let maxCalls = calls | 300; // Times out after 6 seconds
            let timeout = time | 20;

            const interval = setInterval(function(){

                // If waiting for an array of elements use querySelectorAll
                if(multiElements) {
                    elementCached = document.querySelectorAll(cssSelector);
                } else {
                    elementCached = document.querySelector(cssSelector);
                }
                


                // Checks if element 'cssSelector' exists
                if(elementCached) {
                    clearInterval(interval);
                    callback(elementCached);
                }

                // Clear interval after maxCalls is reached - default 6 seconds
                if(--maxCalls < 0) {
                    clearInterval(interval);
                }

            }, timeout);
        }

        // Activate the test
        activate();

        
    } catch (error) {
        if(debugMode) console.log(error.message)
    }
})()