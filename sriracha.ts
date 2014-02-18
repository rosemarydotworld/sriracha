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
  $(%xpath) {
    add_class("mw-hide")
    yield()
  }
}
@func XMLNode.hide() {
  add_class("mw-hide")
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
@func XMLNode.unless(Text %xpath) {
  $("self::*[not(" + %xpath + ")]") {
    yield()
  }
}

# XMLNode: Execute arbitrary code in current scope if xpath returns matches
#
# %xpath - xpath string to attempt to match.
#
# Examples
#
#   has(".//div[@id='condition']") {
#     log("#condition satisfied!")
#   }
#
# Yields scope in which has() was run.
@func XMLNode.has(Text %xpath) {
  $("self::*[" + %xpath + "]") {
    yield()
  }
}

# XMLNode: Move node to the bottom of its parent
#
# %xpath - xpath string to attempt to match.
#
# Examples
#
#   to_bottom("./div[@id='test']")
#
#   $("./div[@id='test']") {
#     to_bottom()
#   }
#
# Yields scope in which to_bottom() was run.
@func XMLNode.to_bottom(Text %xpath) {
  $(%xpath) {
    move_to("parent::*", "bottom")
    yield()
  }
}
@func XMLNode.to_bottom() {
  move_to("parent::*", "bottom")
  yield()
}

# XMLNode: Move node to the top of its parent
#
# %xpath - xpath string to attempt to match.
#
# Examples
#
#   to_top("./div[@id='test']")
#
#   $("./div[@id='test']") {
#     to_top()
#   }
#
# Yields scope in which to_bottom() was run.
@func XMLNode.to_top(Text %xpath) {
  $(%xpath) {
    move_to("parent::*", "top")
    yield()
  }
}
@func XMLNode.to_top() {
  move_to("parent::*", "top")
  yield()
}

# XMLNode: Loop the yielded code as many times as the argument
#
# %count - Number of times to loop.
# NOTE: %count cannot exceed the number of direct children to the body
#
# Examples
#
#   times("10") {
#     do_something()
#   }
#
# Yields scope in which times() was run.
@func XMLNode.times(Text %count) {
  %p = path()
  $("/html/body/*[position() <= " + %count + "]") {
    $(%p) {
      yield()
    }
  }
}