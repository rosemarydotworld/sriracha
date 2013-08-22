# ***
# Hide either the current scope or a specified scope
#
# %xpath (optional) - xpath string matching nodes to be hidden
# ***
@func XMLNode.hide(Text %xpath) {
  match_not(%xpath, /^.+$/) {
    add_class("mw-hide")
  }
  else() {
    $(%xpath) {
      add_class("mw-hide")
    }
  }

  yield()
}

# ***
# Execute arbitrary code if xpath matches no nodes
#
# %xpath - xpath string to attempt to match
# ***
@func XMLNode.unless(Text %xpath) {
  $("self::*[not(" + %xpath + ")]") {
    yield()
  }
}