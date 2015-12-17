(function($, window, document) {
  var cnt = window.location.search.substr(1).split('=')[1] | 0,
    targetCount = 20;

  var completed = 0,
    benchmarks = BenchmarkSuite.CountBenchmarks(),
    success = true,
    scores = [];

  var name,
    turboboost,
    note;

  function send() {
    return $.ajax({
      'type': 'POST',
      'url': 'tbd.php',
      'data': {
        name: 'yasuda',
        turboboost: true,
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
          window.location.search = '?cnt=' + (++cnt);
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
    if (cnt < targetCount) {
      disp('<h3>' + (cnt + 1) + '/' + targetCount + 'start: ' + new Date() + '</h3>');
      setTimeout(Run, 500);
    } else {
      disp('<h3>all test has done.</h3>');
    }
  };
}(jQuery, window, document));
