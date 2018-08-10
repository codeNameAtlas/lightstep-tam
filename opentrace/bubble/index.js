const { initTracer } = require("../../lib/tracing");

const tracer = initTracer("bubble");


function bubbleSort(items) {

  const innerLoop = (ctx, item) => {
    ctx = {
      span: tracer.startSpan("inner-loop", { childOf: ctx.span }),
    };
    console.log(item);
    ctx.span.log({ event: "inner-loop" });
    ctx.span.finish();
  };

  for (var i = 0; i < items.length; i++) { //Number of passes
    const span = tracer.startSpan(items[i]);
    const ctx = { span };
    span.setTag("outer-loop", items[i]);
    span.finish();

    for (var j = 0; j < (items.length - i - 1); j++) { //Notice that j < (length - i)
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

tracer.close(() => process.exit());
