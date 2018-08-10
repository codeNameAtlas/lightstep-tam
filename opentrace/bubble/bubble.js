//this file is the bubbleSort solution that sends traces to lightstep

const lightstep   = require('lightstep-tracer');
const { initTracer } = require("../../lib/tracing");

var tracer = new lightstep.Tracer({
    access_token   : '<ENTER ACCESS TOKEN>',
    component_name : 'lightstep-tracer/bubbleSort',
});



function bubbleSort(items) {

  const innerLoop = (ctx, item) => {
    ctx = {
      span: tracer.startSpan("inner-loop", { childOf: ctx.span }),
    };
    console.log(item);
    ctx.span.log({ event: "inner-loop" });
    var url = ctx.span.generateTraceURL();
    console.log('URL: ' + url);
    ctx.span.finish();
  };

  for (var i = 0; i < items.length; i++) {
    const span = tracer.startSpan(items[i]);
    const ctx = { span };
    span.setTag("outer-loop", items[i]);
    span.finish();

    for (var j = 0; j < (items.length - i - 1); j++) {
      //Compare the adjacent positions
      innerLoop(ctx, items[j]);

      if (items[j].length > items[j + 1].length) {
        var tmp = items[j]; //Temporary variable to hold the current number
        items[j] = items[j + 1]; //Replace current number with adjacent number
        items[j + 1] = tmp; //Replace adjacent number with current number
      }
    }
  }
  var sorted = items;
  console.log(sorted);

}


bubbleSort(['engineering', 'trace', 'microservices', 'span', 'lightstep', 'histogram', 'tag'])
