const { initTracer } = require("../../lib/tracing");

const tracer = initTracer("quick");


function quickSort(items) {
	var smaller = []; var larger = [];
	if (items.length <= 1)
		return items;

   const outerLoop = (ctx, item) => {
      ctx = {
        span: tracer.startSpan("outer-loop", { childOf: ctx.span }),
      };
      console.log(item);
      ctx.span.log({ event: "outer-loop" });
      ctx.span.finish();
    };

	for (var i = 1; i < items.length; i++) {
    const span = tracer.startSpan(items[i]);
    const ctx = { span };
    span.setTag("inner-loop", items[i]);
    span.finish();
		if (items[i].length < items[0].length)
			smaller.push(items[i]);
		if (items[i].length >= items[0].length)
			larger.push(items[i]);
	}

	return quickSort(smaller).concat(items[0], quickSort(larger));
  outerLoop(ctx, items[i]);
}


quickSort(['engineering', 'trace', 'microservices', 'span', 'lightstep', 'histogram', 'tag'])

tracer.close(() => process.exit());
