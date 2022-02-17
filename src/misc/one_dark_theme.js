ace.define("ace/theme/one_dark", ["require", "exports", "module", "ace/lib/dom"], function (require, exports, module) {
  exports.isDark = true;
  exports.cssClass = "ace-one-dark";
  exports.cssText =
    ".ace-one-dark .ace_gutter {\
    background: #282C34;\
    color: #5C6370\
    }\
    .ace-one-dark .ace_print-margin {\
    width: 1px;\
    background: #424451\
    }\
    .ace-one-dark {\
    background-color: #282C34;\
    color: #ABB2BF\
    }\
    .ace-one-dark .ace_cursor {\
    color: #528BFF\
    }\
    .ace-one-dark .ace_marker-layer .ace_selection {\
    background: #3D4350\
    }\
    .ace-one-dark.ace_multiselect .ace_selection.ace_start {\
    box-shadow: 0 0 3px 0 #268BD2;\
    }\
    .ace-one-dark .ace_marker-layer .ace_step {\
    background: #3A6DA0\
    }\
    .ace-one-dark .ace_marker-layer .ace_bracket {\
    background-color: #2B313A;\
    border: 1px solid #3A6DA0\
    }\
    .ace-one-dark .ace_marker-layer .ace_active-line {\
    background-color: #2B313A\
    }\
    .ace-one-dark .ace_gutter-active-line {\
    background-color: #2B313A\
    }\
    .ace-one-dark .ace_marker-layer .ace_selected-word {\
    background-color: #2B313A;\
    border: 1px solid #3D4350\
    }\
    .ace-one-dark .ace_invisible {\
    color: #5C6370\
    }\
    .ace-one-dark .ace_entity.ace_name.ace_tag,\
    .ace-one-dark .ace_meta.ace_tag,\
    .ace-one-dark .ace_storage {\
    color: #C678DD\
    }\
    .ace-one-dark .ace_keyword,\
    .ace-one-dark .ace_punctuation,\
    .ace-one-dark .ace_punctuation.ace_tag {\
    color: #ABB2BF\
    }\
    .ace-one-dark .ace_entity.ace_other.ace_attribute-name,\
    .ace-one-dark .ace_constant.ace_character,\
    .ace-one-dark .ace_constant.ace_language,\
    .ace-one-dark .ace_constant.ace_numeric,\
    .ace-one-dark .ace_constant.ace_other {\
    color: #FFC66D\
    }\
    .ace-one-dark .ace_invalid {\
    color: #fff;\
    background-color: #900\
    }\
    .ace-one-dark .ace_invalid.ace_deprecated {\
    color: #fff;\
    background-color: #900\
    }\
    .ace-one-dark .ace_support.ace_constant {\
    color: #FFC66D\
    }\
    .ace-one-dark .ace_support.ace_function {\
    color: #61AFEF\
    }\
    .ace-one-dark .ace_fold {\
    background-color: #5C6370;\
    border-color: #93A1A1\
    }\
    .ace-one-dark .ace_storage.ace_type,\
    .ace-one-dark .ace_support.ace_class,\
    .ace-one-dark .ace_support.ace_type {\
    color: #C678DD\
    }\
    .ace-one-dark .ace_entity.ace_other,\
    .ace-one-dark .ace_entity.ace_name.ace_function {\
    color: #61AFEF\
    }\
    .ace-one-dark .ace_variable {\
    color: #E06C75\
    }\
    .ace-one-dark .ace_variable.ace_parameter {\
    color: #E06C75\
    }\
    .ace-one-dark .ace_string {\
    color: #98C379\
    }\
    .ace-one-dark .ace_comment {\
    font-style: italic;\
    color: #5C6370\
    }\
    .ace-one-dark .ace_indent-guide {\
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWNQ1NbwZfALD/4PAAlTArlEC4r/AAAAAElFTkSuQmCC) right repeat-y\
    }";

  var dom = require("../lib/dom");
  dom.importCssString(exports.cssText, exports.cssClass);
});
