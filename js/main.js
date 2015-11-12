(function($, window, document) {
  var completed = 0,
    benchmarks = BenchmarkSuite.CountBenchmarks(),
    success = true,
    scores = [];

  var name,
    turboboost,
    note;

  console.log(benchmarks);

  function send() {
    $.ajax({
      'type': 'POST',
      'url': 'tbd.php',
      'data': {
        name: name,
        turboboost: turboboost,
        scores: JSON.stringify(scores),
        note: note
      }
    });
  }

  function disp() {
    var dom = '<p>result</p>';
    scores.forEach(function(el) {
      dom += '<p>' + el.name + ': ' + el.score + '</p>';
    });
    $('#result').append(dom);
  }

  function detectTurboBoost() {}

  function AddResult(name, result) {
    console.log(name, ': ', result);
    scores.push({
      name: name,
      score: result
    });
    if (++completed === benchmarks - 1) {
      detectTurboBoost();
      send();
      disp();
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

  $('#run').on('click', function() {
    if(!$('#name').val() || !$('input[name="tb"]:checked').val()) {
      return;
    }
    Run();
  });
}(jQuery, window, document));
