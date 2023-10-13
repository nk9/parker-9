//
// Limit text input to numbers only
//
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}

var elements = document.getElementsByClassName("numberOnly");
var i;
for (i = 0; i < elements.length; i++) {
  setInputFilter(elements[i], function(value) {
    return /^\d{0,2}$/.test(value);
  });
}

//
// Validate form contents on submit
//
const hashes = ["9400f1b21cb527d7fa3d3eabba93557a18ebe7a2ca4e471cfe5e4c5b4ca7f767",
                "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
                "59e19706d51d39f66711c2653cd7eb1291c94d9b55eb14bda74ce4dc636d015a"]
function validateForm()
{
  // Check the 3 input field values
  var success = true;
  var elements = document.getElementsByClassName("numberOnly");
  var i;
  for (i = 0; i < elements.length; i++) {
    var guess = elements[i].value;

    var hash = sjcl.hash.sha256.hash(guess);
    var hashHex = sjcl.codec.hex.fromBits(hash);

    if (hashHex !== hashes[i]) {
      elements[i].style.borderColor = "red";
      success = false;
    } else {
      elements[i].style.borderColor = "#45F203";
    }
  }

  if (success) {
    showSuccess();
    $('#hidden').delay(5000).fadeIn(500);
  }

  return false;
}

//
// Focus Q1 input to start
//
$('#q1').focus();
