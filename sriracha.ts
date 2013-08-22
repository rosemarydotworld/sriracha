# XMLNode: Hides either the current scope or a specified scope.
#
# %xpath - optional xpath string matching nodes to be hidden.
#
# Examples
#
#   $(".//div[@id='to-be-hidden']") {
#     hide()
#   }
#
#   hide(".//div[@id='to-be-hidden']")
#
# Yields scope of hidden element.
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

# XMLNode: Execute arbitrary code if xpath matches no nodes.
#
# %xpath - xpath string to attempt to match.
#
# Examples
#
#   unless(".//div[@id='nonexistent']") {
#     log("#nonexistent not found!")
#   }
#
# Yields scope in which unless() was run.
}
@func XMLNode.unless(Text %xpath) {
  $("self::*[not(" + %xpath + ")]") {
    yield()
  }
}