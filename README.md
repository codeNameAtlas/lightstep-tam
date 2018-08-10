# lightstep-tam
learning the lightstep and opentrace api

# Run The Code
Clone this repo to your machine locally. 
Enter your lightstep access key in the `bubble.js` and `quick.js` file
Double check your machine is configured to work with [opentracing](https://github.com/yurishkuro/opentracing-tutorial)

```
npm install
cd opentracing/bubble
node index.js
node bubble.js
```


My app follows this structure:

```
root/
  lib/    
    tracing.js - initialize Jaeger tracer
  opentracing/
     /bubble
           /bubble.js - bubblesort routing to lightstep
           /index.js  - bubblesort implemented with opentracing
     /quick
           /quick.js - quicksort routing to lightstep
           /index.js - quicksort implemented with opentracing
```

