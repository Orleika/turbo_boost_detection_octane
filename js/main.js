(function($, window, document) {
  var completed = 0,
    benchmarks = BenchmarkSuite.CountBenchmarks(),
    success = true,
    scores = [];

  var name,
    turboboost,
    note;

  var targetTime = Date.parse('2015-12-04T10:40:00+09:00');
  var now = Date.now();

  function send() {
    return $.ajax({
      'type': 'POST',
      'url': 'tbd.php',
      'data': {
        name: 'yasuda',
        turboboost: false,
        scores: JSON.stringify(scores)
      }
    });
  }

  function disp(dom) {
    $('#result').append(dom);
  }

  function detectTurboBoost() {}

  function AddResult(name, result) {
    scores.push({
      name: name,
      score: result
    });
    if (++completed === benchmarks - 1) {
      detectTurboBoost();
      send()
        .then(function() {
            disp('<h3>end: ' + new Date() + '</h3>');
            // location.reload();
        });
    }
  }

  function AddError(name, error) {
    console.error(name, ': ', error);
    success = false;
  }

  function Run() {
    BenchmarkSuite.RunSuites({
      NotifyError: AddError,
      NotifyResult: AddResult
    }, []);
  }

  window.onload = function() {
  //  if (now < targetTime) {
      disp('<h3>start: ' + new Date(now) + '</h3>');
      setTimeout(Run, 500);
  //  } else {
  //    disp('<h3>all test has done.</h3>');
  //  }
  };
}(jQuery, window, document));
