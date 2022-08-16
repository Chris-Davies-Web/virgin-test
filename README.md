# Virgin Media CRO Coding Test
## Chris Davies - 15/08/2022

When creating a test I normally create a readme to assist for the code review.
The readme would consist of:
1. Links to the designs
2. Links to the test hyposthesis document
3. Preview links of the variations 
4. Any other relevant information (i.e. segments, metrics, technical discovery)

*** Notes ***

I had issues implementing a Mutation Observer on the Angular site. 
It seemed to work rarely and inconsistently so I took the approach of a set interval instead. 

I couldn't find a funciton on the window object to create a modal so I created it manually.
As each modal has scoped styling I couldn't use the styles on the site so I had to copy them into the CSS file.