! function(a, b) {
	"function" == typeof define && define.amd ? define("textAngular", ["rangy", "rangy/lib/rangy-selectionsaverestore"], function(c, d) {
		return a["textAngular.name"] = b(c, d)
	}) : "object" == typeof exports ? module.exports = b(require("rangy"), require("rangy/lib/rangy-selectionsaverestore")) : a.textAngular = b(rangy)
}(this, function(a) {
	function b(a) {
		try {
			return 0 !== angular.element(a).length
		} catch (b) {
			return !1
		}
	}

	function c(a, c) {
		if (!a || "" === a || d.hasOwnProperty(a)) throw "textAngular Error: A unique name is required for a Tool Definition";
		if (c.display && ("" === c.display || !b(c.display)) || !c.display && !c.buttontext && !c.iconclass) throw 'textAngular Error: Tool Definition for "' + a + '" does not have a valid display/iconclass/buttontext value';
		d[a] = c
	}
	var d = {};
	angular.module("textAngularSetup", []).constant("taRegisterTool", c).value("taTools", d).value("taOptions", {
		forceTextAngularSanitize: !0,
		keyMappings: [],
		toolbar: [
			["h1", "h2", "h3", "h4", "h5", "h6", "p", "pre", "quote"],
			["bold", "italics", "underline", "strikeThrough", "ul", "ol", "redo", "undo", "clear"],
			["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
			["html", "insertImage", "insertLink", "insertVideo", "wordcount", "charcount"]
		],
		classes: {
			focussed: "focussed",
			toolbar: "btn-toolbar",
			toolbarGroup: "btn-group",
			toolbarButton: "btn btn-default",
			toolbarButtonActive: "active",
			disabled: "disabled",
			textEditor: "form-control",
			htmlEditor: "form-control"
		},
		defaultTagAttributes: {
			a: {
				target: ""
			}
		},
		setup: {
			textEditorSetup: function(a) {},
			htmlEditorSetup: function(a) {}
		},
		defaultFileDropHandler: function(a, b) {
			var c = new FileReader;
			return "image" === a.type.substring(0, 5) ? (c.onload = function() {
				"" !== c.result && b("insertImage", c.result, !0)
			}, c.readAsDataURL(a), !0) : !1
		}
	}).value("taSelectableElements", ["a", "img"]).value("taCustomRenderers", [{
		selector: "img",
		customAttribute: "ta-insert-video",
		renderLogic: function(a) {
			var b = angular.element("<iframe></iframe>"),
				c = a.prop("attributes");
			angular.forEach(c, function(a) {
				b.attr(a.name, a.value)
			}), b.attr("src", b.attr("ta-insert-video")), a.replaceWith(b)
		}
	}]).value("taTranslations", {
		html: {
			tooltip: "Toggle html / Rich Text"
		},
		heading: {
			tooltip: "Heading "
		},
		p: {
			tooltip: "Paragraph"
		},
		pre: {
			tooltip: "Preformatted text"
		},
		ul: {
			tooltip: "Unordered List"
		},
		ol: {
			tooltip: "Ordered List"
		},
		quote: {
			tooltip: "Quote/unquote selection or paragraph"
		},
		undo: {
			tooltip: "Undo"
		},
		redo: {
			tooltip: "Redo"
		},
		bold: {
			tooltip: "Bold"
		},
		italic: {
			tooltip: "Italic"
		},
		underline: {
			tooltip: "Underline"
		},
		strikeThrough: {
			tooltip: "Strikethrough"
		},
		justifyLeft: {
			tooltip: "Align text left"
		},
		justifyRight: {
			tooltip: "Align text right"
		},
		justifyFull: {
			tooltip: "Justify text"
		},
		justifyCenter: {
			tooltip: "Center"
		},
		indent: {
			tooltip: "Increase indent"
		},
		outdent: {
			tooltip: "Decrease indent"
		},
		clear: {
			tooltip: "Clear formatting"
		},
		insertImage: {
			dialogPrompt: "Please enter an image URL to insert",
			tooltip: "Insert image",
			hotkey: "the - possibly language dependent hotkey ... for some future implementation"
		},
		insertVideo: {
			tooltip: "Insert video",
			dialogPrompt: "Please enter a youtube URL to embed"
		},
		insertLink: {
			tooltip: "Insert / edit link",
			dialogPrompt: "Please enter a URL to insert"
		},
		editLink: {
			reLinkButton: {
				tooltip: "Relink"
			},
			unLinkButton: {
				tooltip: "Unlink"
			},
			targetToggle: {
				buttontext: "Open in New Window"
			}
		},
		wordcount: {
			tooltip: "Display words Count"
		},
		charcount: {
			tooltip: "Display characters Count"
		}
	}).factory("taToolFunctions", ["$window", "taTranslations", function(a, b) {
		return {
			imgOnSelectAction: function(a, b, c) {
				var d = function() {
					c.updateTaBindtaTextElement(), c.hidePopover()
				};
				a.preventDefault(), c.displayElements.popover.css("width", "375px");
				var e = c.displayElements.popoverContainer;
				e.empty();
				var f = angular.element('<div class="btn-group" style="padding-right: 6px;">'),
					g = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');
				g.on("click", function(a) {
					a.preventDefault(), b.css({
						width: "100%",
						height: ""
					}), d()
				});
				var h = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');
				h.on("click", function(a) {
					a.preventDefault(), b.css({
						width: "50%",
						height: ""
					}), d()
				});
				var i = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');
				i.on("click", function(a) {
					a.preventDefault(), b.css({
						width: "25%",
						height: ""
					}), d()
				});
				var j = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');
				j.on("click", function(a) {
					a.preventDefault(), b.css({
						width: "",
						height: ""
					}), d()
				}), f.append(g), f.append(h), f.append(i), f.append(j), e.append(f), f = angular.element('<div class="btn-group" style="padding-right: 6px;">');
				var k = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');
				k.on("click", function(a) {
					a.preventDefault(), b.css("float", "left"), b.css("cssFloat", "left"), b.css("styleFloat", "left"), d()
				});
				var l = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');
				l.on("click", function(a) {
					a.preventDefault(), b.css("float", "right"), b.css("cssFloat", "right"), b.css("styleFloat", "right"), d()
				});
				var m = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');
				m.on("click", function(a) {
					a.preventDefault(), b.css("float", ""), b.css("cssFloat", ""), b.css("styleFloat", ""), d()
				}), f.append(k), f.append(m), f.append(l), e.append(f), f = angular.element('<div class="btn-group">');
				var n = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');
				n.on("click", function(a) {
					a.preventDefault(), b.remove(), d()
				}), f.append(n), e.append(f), c.showPopover(b), c.showResizeOverlay(b)
			},
			aOnSelectAction: function(c, d, e) {
				c.preventDefault(), e.displayElements.popover.css("width", "436px");
				var f = e.displayElements.popoverContainer;
				f.empty(), f.css("line-height", "28px");
				var g = angular.element('<a href="' + d.attr("href") + '" target="_blank">' + d.attr("href") + "</a>");
				g.css({
					display: "inline-block",
					"max-width": "200px",
					overflow: "hidden",
					"text-overflow": "ellipsis",
					"white-space": "nowrap",
					"vertical-align": "middle"
				}), f.append(g);
				var h = angular.element('<div class="btn-group pull-right">'),
					i = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="' + b.editLink.reLinkButton.tooltip + '"><i class="fa fa-edit icon-edit"></i></button>');
				i.on("click", function(c) {
					c.preventDefault();
					var f = a.prompt(b.insertLink.dialogPrompt, d.attr("href"));
					f && "" !== f && "http://" !== f && (d.attr("href", f), e.updateTaBindtaTextElement()), e.hidePopover()
				}), h.append(i);
				var j = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="' + b.editLink.unLinkButton.tooltip + '"><i class="fa fa-unlink icon-unlink"></i></button>');
				j.on("click", function(a) {
					a.preventDefault(), d.replaceWith(d.contents()), e.updateTaBindtaTextElement(), e.hidePopover()
				}), h.append(j);
				var k = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on">' + b.editLink.targetToggle.buttontext + "</button>");
				"_blank" === d.attr("target") && k.addClass("active"), k.on("click", function(a) {
					a.preventDefault(), d.attr("target", "_blank" === d.attr("target") ? "" : "_blank"), k.toggleClass("active"), e.updateTaBindtaTextElement()
				}), h.append(k), f.append(h), e.showPopover(d)
			},
			extractYoutubeVideoId: function(a) {
				var b = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i,
					c = a.match(b);
				return c && c[1] || null
			}
		}
	}]).run(["taRegisterTool", "$window", "taTranslations", "taSelection", "taToolFunctions", "$sanitize", "taOptions", function(a, b, c, d, e, f, g) {
		var h = {};
		if (f("", h), g.forceTextAngularSanitize === !0 && "taSanitize" !== h.version) throw angular.$$minErr("textAngular")("textAngularSetup", "The textAngular-sanitize provider has been replaced by another -- have you included angular-sanitize by mistake?");
		a("html", {
			iconclass: "fa fa-code",
			tooltiptext: c.html.tooltip,
			action: function() {
				this.$editor().switchView()
			},
			activeState: function() {
				return this.$editor().showHtml
			}
		});
		var i = function(a) {
				return function() {
					return this.$editor().queryFormatBlockState(a)
				}
			},
			j = function() {
				return this.$editor().wrapSelection("formatBlock", "<" + this.name.toUpperCase() + ">")
			};
		angular.forEach(["h1", "h2", "h3", "h4", "h5", "h6"], function(b) {
			a(b.toLowerCase(), {
				buttontext: b.toUpperCase(),
				tooltiptext: c.heading.tooltip + b.charAt(1),
				action: j,
				activeState: i(b.toLowerCase())
			})
		}), a("p", {
			buttontext: "P",
			tooltiptext: c.p.tooltip,
			action: function() {
				return this.$editor().wrapSelection("formatBlock", "<P>")
			},
			activeState: function() {
				return this.$editor().queryFormatBlockState("p")
			}
		}), a("pre", {
			buttontext: "pre",
			tooltiptext: c.pre.tooltip,
			action: function() {
				return this.$editor().wrapSelection("formatBlock", "<PRE>")
			},
			activeState: function() {
				return this.$editor().queryFormatBlockState("pre")
			}
		}), a("ul", {
			iconclass: "fa fa-list-ul",
			tooltiptext: c.ul.tooltip,
			action: function() {
				return this.$editor().wrapSelection("insertUnorderedList", null)
			},
			activeState: function() {
				return this.$editor().queryCommandState("insertUnorderedList")
			}
		}), a("ol", {
			iconclass: "fa fa-list-ol",
			tooltiptext: c.ol.tooltip,
			action: function() {
				return this.$editor().wrapSelection("insertOrderedList", null)
			},
			activeState: function() {
				return this.$editor().queryCommandState("insertOrderedList")
			}
		}), a("quote", {
			iconclass: "fa fa-quote-right",
			tooltiptext: c.quote.tooltip,
			action: function() {
				return this.$editor().wrapSelection("formatBlock", "<BLOCKQUOTE>")
			},
			activeState: function() {
				return this.$editor().queryFormatBlockState("blockquote")
			}
		}), a("undo", {
			iconclass: "fa fa-undo",
			tooltiptext: c.undo.tooltip,
			action: function() {
				return this.$editor().wrapSelection("undo", null)
			}
		}), a("redo", {
			iconclass: "fa fa-repeat",
			tooltiptext: c.redo.tooltip,
			action: function() {
				return this.$editor().wrapSelection("redo", null)
			}
		}), a("bold", {
			iconclass: "fa fa-bold",
			tooltiptext: c.bold.tooltip,
			action: function() {
				return this.$editor().wrapSelection("bold", null)
			},
			activeState: function() {
				return this.$editor().queryCommandState("bold")
			},
			commandKeyCode: 98
		}), a("justifyLeft", {
			iconclass: "fa fa-align-left",
			tooltiptext: c.justifyLeft.tooltip,
			action: function() {
				return this.$editor().wrapSelection("justifyLeft", null)
			},
			activeState: function(a) {
				if (a && "#document" === a.nodeName) return !1;
				var b = !1;
				return a && (b = "left" === a.css("text-align") || "left" === a.attr("align") || "right" !== a.css("text-align") && "center" !== a.css("text-align") && "justify" !== a.css("text-align") && !this.$editor().queryCommandState("justifyRight") && !this.$editor().queryCommandState("justifyCenter") && !this.$editor().queryCommandState("justifyFull")), b = b || this.$editor().queryCommandState("justifyLeft")
			}
		}), a("justifyRight", {
			iconclass: "fa fa-align-right",
			tooltiptext: c.justifyRight.tooltip,
			action: function() {
				return this.$editor().wrapSelection("justifyRight", null)
			},
			activeState: function(a) {
				if (a && "#document" === a.nodeName) return !1;
				var b = !1;
				return a && (b = "right" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyRight")
			}
		}), a("justifyFull", {
			iconclass: "fa fa-align-justify",
			tooltiptext: c.justifyFull.tooltip,
			action: function() {
				return this.$editor().wrapSelection("justifyFull", null)
			},
			activeState: function(a) {
				var b = !1;
				return a && (b = "justify" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyFull")
			}
		}), a("justifyCenter", {
			iconclass: "fa fa-align-center",
			tooltiptext: c.justifyCenter.tooltip,
			action: function() {
				return this.$editor().wrapSelection("justifyCenter", null)
			},
			activeState: function(a) {
				if (a && "#document" === a.nodeName) return !1;
				var b = !1;
				return a && (b = "center" === a.css("text-align")), b = b || this.$editor().queryCommandState("justifyCenter")
			}
		}), a("indent", {
			iconclass: "fa fa-indent",
			tooltiptext: c.indent.tooltip,
			action: function() {
				return this.$editor().wrapSelection("indent", null)
			},
			activeState: function() {
				return this.$editor().queryFormatBlockState("blockquote")
			},
			commandKeyCode: "TabKey"
		}), a("outdent", {
			iconclass: "fa fa-outdent",
			tooltiptext: c.outdent.tooltip,
			action: function() {
				return this.$editor().wrapSelection("outdent", null)
			},
			activeState: function() {
				return !1
			},
			commandKeyCode: "ShiftTabKey"
		}), a("italics", {
			iconclass: "fa fa-italic",
			tooltiptext: c.italic.tooltip,
			action: function() {
				return this.$editor().wrapSelection("italic", null)
			},
			activeState: function() {
				return this.$editor().queryCommandState("italic")
			},
			commandKeyCode: 105
		}), a("underline", {
			iconclass: "fa fa-underline",
			tooltiptext: c.underline.tooltip,
			action: function() {
				return this.$editor().wrapSelection("underline", null)
			},
			activeState: function() {
				return this.$editor().queryCommandState("underline")
			},
			commandKeyCode: 117
		}), a("strikeThrough", {
			iconclass: "fa fa-strikethrough",
			tooltiptext: c.strikeThrough.tooltip,
			action: function() {
				return this.$editor().wrapSelection("strikeThrough", null)
			},
			activeState: function() {
				return document.queryCommandState("strikeThrough")
			}
		}), a("clear", {
			iconclass: "fa fa-ban",
			tooltiptext: c.clear.tooltip,
			action: function(a, b) {
				var c;
				this.$editor().wrapSelection("removeFormat", null);
				var e = angular.element(d.getSelectionElement()),
					f = function(a) {
						a = angular.element(a);
						var b = a;
						angular.forEach(a.children(), function(a) {
							var c = angular.element("<p></p>");
							c.html(angular.element(a).html()), b.after(c), b = c
						}), a.remove()
					};
				if (angular.forEach(e.find("ul"), f), angular.forEach(e.find("ol"), f), "li" === e[0].tagName.toLowerCase()) {
					var g = e[0].parentNode.childNodes,
						h = [],
						i = [],
						j = !1;
					for (c = 0; c < g.length; c++) g[c] === e[0] ? j = !0 : j ? i.push(g[c]) : h.push(g[c]);
					var k = angular.element(e[0].parentNode),
						l = angular.element("<p></p>");
					if (l.html(angular.element(e[0]).html()), 0 === h.length || 0 === i.length) 0 === i.length ? k.after(l) : k[0].parentNode.insertBefore(l[0], k[0]), 0 === h.length && 0 === i.length ? k.remove() : angular.element(e[0]).remove();
					else {
						var m = angular.element("<" + k[0].tagName + "></" + k[0].tagName + ">"),
							n = angular.element("<" + k[0].tagName + "></" + k[0].tagName + ">");
						for (c = 0; c < h.length; c++) m.append(angular.element(h[c]));
						for (c = 0; c < i.length; c++) n.append(angular.element(i[c]));
						k.after(n), k.after(l), k.after(m), k.remove()
					}
					d.setSelectionToElementEnd(l[0])
				}
				var o = this.$editor(),
					p = function(a) {
						a = angular.element(a), a[0] !== o.displayElements.text[0] && a.removeAttr("class"), angular.forEach(a.children(), p)
					};
				angular.forEach(e, p), "li" !== e[0].tagName.toLowerCase() && "ol" !== e[0].tagName.toLowerCase() && "ul" !== e[0].tagName.toLowerCase() && this.$editor().wrapSelection("formatBlock", "default"), b()
			}
		});
		var k = function(a) {
			return -1 !== a.toLowerCase().indexOf("javascript") ? !0 : !1
		};
		a("insertImage", {
			iconclass: "fa fa-picture-o",
			tooltiptext: c.insertImage.tooltip,
			action: function() {
				var a;
				if (a = b.prompt(c.insertImage.dialogPrompt, "http://"), a && "" !== a && "http://" !== a && !k(a)) {
					"a" === d.getSelectionElement().tagName.toLowerCase() && d.setSelectionAfterElement(d.getSelectionElement());
					var e = '<img src="' + a + '">';
					return this.$editor().wrapSelection("insertHTML", e, !0)
				}
			},
			onElementSelect: {
				element: "img",
				action: e.imgOnSelectAction
			}
		}), a("insertVideo", {
			iconclass: "fa fa-youtube-play",
			tooltiptext: c.insertVideo.tooltip,
			action: function() {
				var a;
				if (a = b.prompt(c.insertVideo.dialogPrompt, "https://"), !k(a) && a && "" !== a && "https://" !== a && (videoId = e.extractYoutubeVideoId(a), videoId)) {
					var f = "https://www.youtube.com/embed/" + videoId,
						g = '<img class="ta-insert-video" src="https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg" ta-insert-video="' + f + '" contenteditable="false" allowfullscreen="true" frameborder="0" />';
					return "a" === d.getSelectionElement().tagName.toLowerCase() && d.setSelectionAfterElement(d.getSelectionElement()), this.$editor().wrapSelection("insertHTML", g, !0)
				}
			},
			onElementSelect: {
				element: "img",
				onlyWithAttrs: ["ta-insert-video"],
				action: e.imgOnSelectAction
			}
		}), a("insertLink", {
			tooltiptext: c.insertLink.tooltip,
			iconclass: "fa fa-link",
			action: function() {
				var a;
				return a = b.prompt(c.insertLink.dialogPrompt, "http://"), a && "" !== a && "http://" !== a && !k(a) ? this.$editor().wrapSelection("createLink", a, !0) : void 0
			},
			activeState: function(a) {
				return a ? "A" === a[0].tagName : !1
			},
			onElementSelect: {
				element: "a",
				action: e.aOnSelectAction
			}
		}), a("wordcount", {
			display: '<div id="toolbarWC" style="display:block; min-width:100px;">Words: <span ng-bind="wordcount"></span></div>',
			disabled: !0,
			wordcount: 0,
			activeState: function() {
				var a = this.$editor().displayElements.text,
					b = a[0].innerHTML || "",
					c = 0;
				return "" !== b.replace(/\s*<[^>]*?>\s*/g, "") && (c = b.replace(/<\/?(b|i|em|strong|span|u|strikethrough|a|img|small|sub|sup|label)( [^>*?])?>/gi, "").replace(/(<[^>]*?>\s*<[^>]*?>)/gi, " ").replace(/(<[^>]*?>)/gi, "").replace(/\s+/gi, " ").match(/\S+/g).length), this.wordcount = c, this.$editor().wordcount = c, !1
			}
		}), a("charcount", {
			display: '<div id="toolbarCC" style="display:block; min-width:120px;">Characters: <span ng-bind="charcount"></span></div>',
			disabled: !0,
			charcount: 0,
			activeState: function() {
				var a = this.$editor().displayElements.text,
					b = a[0].innerText || a[0].textContent,
					c = b.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+/g, " ").replace(/\s+$/g, " ").length;
				return this.charcount = c, this.$editor().charcount = c, !1
			}
		})
	}]);
	var e = {
			ie: function() {
				for (var a, b = 3, c = document.createElement("div"), d = c.getElementsByTagName("i"); c.innerHTML = "<!--[if gt IE " + ++b + "]><i></i><![endif]-->", d[0];);
				return b > 4 ? b : a
			}(),
			webkit: /AppleWebKit\/([\d.]+)/i.test(navigator.userAgent)
		},
		f = /^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)$/i,
		g = /^(ul|li|ol)$/i,
		h = /^(address|article|aside|audio|blockquote|canvas|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video|li)$/i;
	String.prototype.trim || (String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "")
	});
	var i, j, k, l, m, n;
	if (e.ie > 8 || void 0 === e.ie) {
		for (var o = document.styleSheets, p = 0; p < o.length; p++)
			if ((0 === o[p].media.length || o[p].media.mediaText.match(/(all|screen)/gi)) && o[p].href && o[p].href.match(/textangular\.(min\.|)css/gi)) {
				i = o[p];
				break
			}
		i || (i = function() {
			var a = document.createElement("style");
			return e.webkit && a.appendChild(document.createTextNode("")), document.getElementsByTagName("head")[0].appendChild(a), a.sheet
		}()), j = function(a, b) {
			return l(i, a, b)
		}, l = function(a, b, c) {
			var d, e;
			return a.cssRules ? d = Math.max(a.cssRules.length - 1, 0) : a.rules && (d = Math.max(a.rules.length - 1, 0)), a.insertRule ? a.insertRule(b + "{" + c + "}", d) : a.addRule(b, c, d), i.rules ? e = i.rules[d] : i.cssRules && (e = i.cssRules[d]), e
		}, n = function(a, b) {
			var c, d;
			for (c = 0; c < b.length; c++)
				if (b[c].cssText === a.cssText) {
					d = c;
					break
				}
			return d
		}, k = function(a) {
			m(i, a)
		}, m = function(a, b) {
			var c = a.cssRules || a.rules;
			if (c && 0 !== c.length) {
				var d = n(b, c);
				a.removeRule ? a.removeRule(d) : a.deleteRule(d)
			}
		}
	}
	angular.module("textAngular.factories", []).factory("taBrowserTag", [function() {
		return function(a) {
			return a ? "" === a ? void 0 === e.ie ? "div" : e.ie <= 8 ? "P" : "p" : e.ie <= 8 ? a.toUpperCase() : a : e.ie <= 8 ? "P" : "p"
		}
	}]).factory("taApplyCustomRenderers", ["taCustomRenderers", "taDOM", function(a, b) {
		return function(c) {
			var d = angular.element("<div></div>");
			return d[0].innerHTML = c, angular.forEach(a, function(a) {
				var c = [];
				a.selector && "" !== a.selector ? c = d.find(a.selector) : a.customAttribute && "" !== a.customAttribute && (c = b.getByAttribute(d, a.customAttribute)), angular.forEach(c, function(b) {
					b = angular.element(b), a.selector && "" !== a.selector && a.customAttribute && "" !== a.customAttribute ? void 0 !== b.attr(a.customAttribute) && a.renderLogic(b) : a.renderLogic(b)
				})
			}), d[0].innerHTML
		}
	}]).factory("taFixChrome", function() {
		var a = function(a) {
			if (!a || !angular.isString(a) || a.length <= 0) return a;
			for (var b, c, d, e, f = /<([^>\/]+?)style=("([^\"]+)"|'([^']+)')([^>]*)>/gi, g = /<span class="Apple-converted-space">([^<]+)<\/span>/gi, h = "", i = 0; b = g.exec(a);) d = b[1], d = d.replace(/&nbsp;/gi, " "), h += a.substring(i, b.index) + d, i = b.index + b[0].length;
			for (i && (a = h, h = "", i = 0); b = f.exec(a);) c = b[3] || b[4], c && c.match(/line-height: 1.[0-9]{3,12};|color: inherit; line-height: 1.1;|color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);|background-color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);/i) && (c = c.replace(/( |)font-family: inherit;|( |)line-height: 1.[0-9]{3,12};|( |)color: inherit;|( |)color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);|( |)background-color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);/gi, ""), e = "<" + b[1].trim(), c.trim().length > 0 && (e += " style=" + b[2].substring(0, 1) + c + b[2].substring(0, 1)), e += b[5].trim() + ">", h += a.substring(i, b.index) + e, i = b.index + b[0].length);
			return h += a.substring(i), i > 0 ? h.replace(/<span\s?>(.*?)<\/span>(<br(\/|)>|)/gi, "$1") : a
		};
		return a
	}).factory("taSanitize", ["$sanitize", function(a) {
		function b(a, b) {
			for (var c, d = 0, e = 0, f = /<[^>]*>/gi; c = f.exec(a);)
				if (e = c.index, "/" === c[0].substr(1, 1)) {
					if (0 === d) break;
					d--
				} else d++;
			return b + a.substring(0, e) + angular.element(b)[0].outerHTML.substring(b.length) + a.substring(e)
		}

		function c(a) {
			if (!a || !angular.isString(a) || a.length <= 0) return a;
			for (var d, f, g, h, i, k, l = /<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/gi, m = "", n = "", o = 0; f = l.exec(a);) {
				h = f[3] || f[4];
				var p = new RegExp(j, "i");
				if (angular.isString(h) && p.test(h)) {
					i = "";
					for (var q = new RegExp(j, "ig"); g = q.exec(h);)
						for (d = 0; d < e.length; d++) g[2 * d + 2] && (i += "<" + e[d].tag + ">");
					k = c(a.substring(o, f.index)), n += m.length > 0 ? b(k, m) : k, h = h.replace(new RegExp(j, "ig"), ""), n += "<" + f[1].trim(), h.length > 0 && (n += ' style="' + h + '"'), n += f[5] + ">", o = f.index + f[0].length, m = i
				}
			}
			return n += m.length > 0 ? b(a.substring(o), m) : a.substring(o)
		}

		function d(a) {
			if (!a || !angular.isString(a) || a.length <= 0) return a;
			for (var b, c = /<([^>\/]+?)align=("([^"]+)"|'([^']+)')([^>]*)>/gi, d = "", e = 0; b = c.exec(a);) {
				d += a.substring(e, b.index), e = b.index + b[0].length;
				var f = "<" + b[1] + b[5];
				/style=("([^"]+)"|'([^']+)')/gi.test(f) ? f = f.replace(/style=("([^"]+)"|'([^']+)')/i, 'style="$2$3 text-align:' + (b[3] || b[4]) + ';"') : f += ' style="text-align:' + (b[3] || b[4]) + ';"', f += ">", d += f
			}
			return d + a.substring(e)
		}
		for (var e = [{
			property: "font-weight",
			values: ["bold"],
			tag: "b"
		}, {
			property: "font-style",
			values: ["italic"],
			tag: "i"
		}], f = [], g = 0; g < e.length; g++) {
			for (var h = "(" + e[g].property + ":\\s*(", i = 0; i < e[g].values.length; i++) i > 0 && (h += "|"), h += e[g].values[i];
			h += ");)", f.push(h)
		}
		var j = "(" + f.join("|") + ")";
		return function(b, e, f) {
			if (!f) try {
				b = c(b)
			} catch (g) {}
			b = d(b);
			var h;
			try {
				h = a(b), f && (h = b)
			} catch (g) {
				h = e || ""
			}
			var i, j = h.match(/(<pre[^>]*>.*?<\/pre[^>]*>)/gi),
				k = h.replace(/(&#(9|10);)*/gi, ""),
				l = /<pre[^>]*>.*?<\/pre[^>]*>/gi,
				m = 0,
				n = 0;
			for (h = ""; null !== (i = l.exec(k)) && m < j.length;) h += k.substring(n, i.index) + j[m], n = i.index + i[0].length, m++;
			return h + k.substring(n)
		}
	}]).factory("taToolExecuteAction", ["$q", "$log", function(a, b) {
		return function(c) {
			void 0 !== c && (this.$editor = function() {
				return c
			});
			var d, e = a.defer(),
				f = e.promise,
				g = this.$editor();
			try {
				d = this.action(e, g.startAction()), f["finally"](function() {
					g.endAction.call(g)
				})
			} catch (h) {
				b.error(h)
			}(d || void 0 === d) && e.resolve()
		}
	}]), angular.module("textAngular.DOM", ["textAngular.factories"]).factory("taExecCommand", ["taSelection", "taBrowserTag", "$document", function(b, c, d) {
		var e = function(a, c) {
				var d, e, f = a.find("li");
				for (e = f.length - 1; e >= 0; e--) d = angular.element("<" + c + ">" + f[e].innerHTML + "</" + c + ">"), a.after(d);
				a.remove(), b.setSelectionToElementEnd(d[0])
			},
			h = function(a) {
				/(<br(|\/)>)$/i.test(a.innerHTML.trim()) ? b.setSelectionBeforeElement(angular.element(a).find("br")[0]) : b.setSelectionToElementEnd(a)
			},
			i = function(a, b) {
				var c = angular.element("<" + b + ">" + a[0].innerHTML + "</" + b + ">");
				a.after(c), a.remove(), h(c.find("li")[0])
			},
			j = function(a, b, d) {
				for (var e = "", f = 0; f < a.length; f++) e += "<" + c("li") + ">" + a[f].innerHTML + "</" + c("li") + ">";
				var g = angular.element("<" + d + ">" + e + "</" + d + ">");
				b.after(g), b.remove(), h(g.find("li")[0])
			};
		return function(h, k) {
			return h = c(h),
				function(l, m, n, o) {
					var p, q, r, s, t, u, v, w = angular.element("<" + h + ">");
					try {
						v = b.getSelectionElement()
					} catch (x) {}
					var y = angular.element(v);
					if (void 0 !== v) {
						var z = v.tagName.toLowerCase();
						if ("insertorderedlist" === l.toLowerCase() || "insertunorderedlist" === l.toLowerCase()) {
							var A = c("insertorderedlist" === l.toLowerCase() ? "ol" : "ul");
							if (z === A) return e(y, h);
							if ("li" === z && y.parent()[0].tagName.toLowerCase() === A && 1 === y.parent().children().length) return e(y.parent(), h);
							if ("li" === z && y.parent()[0].tagName.toLowerCase() !== A && 1 === y.parent().children().length) return i(y.parent(), A);
							if (z.match(f) && !y.hasClass("ta-bind")) {
								if ("ol" === z || "ul" === z) return i(y, A);
								var B = !1;
								return angular.forEach(y.children(), function(a) {
									a.tagName.match(f) && (B = !0)
								}), B ? j(y.children(), y, A) : j([angular.element("<div>" + v.innerHTML + "</div>")[0]], y, A)
							}
							if (z.match(f)) {
								if (s = b.getOnlySelectedElements(), 0 === s.length) q = angular.element("<" + A + "><li>" + v.innerHTML + "</li></" + A + ">"), y.html(""), y.append(q);
								else {
									if (1 === s.length && ("ol" === s[0].tagName.toLowerCase() || "ul" === s[0].tagName.toLowerCase())) return s[0].tagName.toLowerCase() === A ? e(angular.element(s[0]), h) : i(angular.element(s[0]), A);
									r = "";
									var C = [];
									for (p = 0; p < s.length; p++)
										if (3 !== s[p].nodeType) {
											var D = angular.element(s[p]);
											if ("li" === s[p].tagName.toLowerCase()) continue;
											r += "ol" === s[p].tagName.toLowerCase() || "ul" === s[p].tagName.toLowerCase() ? D[0].innerHTML : "span" !== s[p].tagName.toLowerCase() || "ol" !== s[p].childNodes[0].tagName.toLowerCase() && "ul" !== s[p].childNodes[0].tagName.toLowerCase() ? "<" + c("li") + ">" + D[0].innerHTML + "</" + c("li") + ">" : D[0].childNodes[0].innerHTML, C.unshift(D)
										}
									q = angular.element("<" + A + ">" + r + "</" + A + ">"), C.pop().replaceWith(q), angular.forEach(C, function(a) {
										a.remove()
									})
								}
								return void b.setSelectionToElementEnd(q[0])
							}
						} else {
							if ("formatblock" === l.toLowerCase()) {
								for (u = n.toLowerCase().replace(/[<>]/gi, ""), "default" === u.trim() && (u = h, n = "<" + h + ">"), q = "li" === z ? y.parent() : y; !q[0].tagName || !q[0].tagName.match(f) && !q.parent().attr("contenteditable");) q = q.parent(), z = (q[0].tagName || "").toLowerCase();
								if (z === u) {
									s = q.children();
									var E = !1;
									for (p = 0; p < s.length; p++) E = E || s[p].tagName.match(f);
									E ? (q.after(s), t = q.next(), q.remove(), q = t) : (w.append(q[0].childNodes), q.after(w), q.remove(), q = w)
								} else if (q.parent()[0].tagName.toLowerCase() !== u || q.parent().hasClass("ta-bind"))
									if (z.match(g)) q.wrap(n);
									else {
										for (s = b.getOnlySelectedElements(), 0 === s.length && (s = [q[0]]), p = 0; p < s.length; p++)
											if (3 === s[p].nodeType || !s[p].tagName.match(f))
												for (; 3 === s[p].nodeType || !s[p].tagName || !s[p].tagName.match(f);) s[p] = s[p].parentNode;
										if (s = s.filter(function(a, b, c) {
												return c.indexOf(a) === b
											}), angular.element(s[0]).hasClass("ta-bind")) q = angular.element(n), q[0].innerHTML = s[0].innerHTML, s[0].innerHTML = q[0].outerHTML;
										else if ("blockquote" === u) {
											for (r = "", p = 0; p < s.length; p++) r += s[p].outerHTML;
											for (q = angular.element(n), q[0].innerHTML = r, s[0].parentNode.insertBefore(q[0], s[0]), p = s.length - 1; p >= 0; p--) s[p].parentNode && s[p].parentNode.removeChild(s[p])
										} else
											for (p = 0; p < s.length; p++) q = angular.element(n), q[0].innerHTML = s[p].innerHTML, s[p].parentNode.insertBefore(q[0], s[p]), s[p].parentNode.removeChild(s[p])
									}
								else {
									var F = q.parent(),
										G = F.contents();
									for (p = 0; p < G.length; p++) F.parent().hasClass("ta-bind") && 3 === G[p].nodeType && (w = angular.element("<" + h + ">"), w[0].innerHTML = G[p].outerHTML, G[p] = w[0]), F.parent()[0].insertBefore(G[p], F[0]);
									F.remove()
								}
								return void b.setSelectionToElementEnd(q[0])
							}
							if ("createlink" === l.toLowerCase()) {
								var H = '<a href="' + n + '" target="' + (o.a.target ? o.a.target : "") + '">',
									I = "</a>",
									J = b.getSelection();
								if (J.collapsed) b.insertHtml(H + n + I, k);
								else if (a.getSelection().getRangeAt(0).canSurroundContents()) {
									var K = angular.element(H + I)[0];
									a.getSelection().getRangeAt(0).surroundContents(K)
								}
								return
							}
							if ("inserthtml" === l.toLowerCase()) return void b.insertHtml(n, k)
						}
					}
					try {
						d[0].execCommand(l, m, n)
					} catch (x) {}
				}
		}
	}]).service("taSelection", ["$document", "taDOM", function(b, c) {
		var d = b[0],
			e = function(a, b) {
				return a.tagName && a.tagName.match(/^br$/i) && 0 === b && !a.previousSibling ? {
					element: a.parentNode,
					offset: 0
				} : {
					element: a,
					offset: b
				}
			},
			g = {
				getSelection: function() {
					var b = a.getSelection().getRangeAt(0),
						c = b.commonAncestorContainer,
						d = {
							start: e(b.startContainer, b.startOffset),
							end: e(b.endContainer, b.endOffset),
							collapsed: b.collapsed
						};
					return c = 3 === c.nodeType ? c.parentNode : c, c.parentNode === d.start.element || c.parentNode === d.end.element ? d.container = c.parentNode : d.container = c, d
				},
				getOnlySelectedElements: function() {
					var b = a.getSelection().getRangeAt(0),
						c = b.commonAncestorContainer;
					return c = 3 === c.nodeType ? c.parentNode : c, b.getNodes([1], function(a) {
						return a.parentNode === c
					})
				},
				getSelectionElement: function() {
					return g.getSelection().container
				},
				setSelection: function(b, c, d) {
					var e = a.createRange();
					e.setStart(b, c), e.setEnd(b, d), a.getSelection().setSingleRange(e)
				},
				setSelectionBeforeElement: function(b) {
					var c = a.createRange();
					c.selectNode(b), c.collapse(!0), a.getSelection().setSingleRange(c)
				},
				setSelectionAfterElement: function(b) {
					var c = a.createRange();
					c.selectNode(b), c.collapse(!1), a.getSelection().setSingleRange(c)
				},
				setSelectionToElementStart: function(b) {
					var c = a.createRange();
					c.selectNodeContents(b), c.collapse(!0), a.getSelection().setSingleRange(c)
				},
				setSelectionToElementEnd: function(b) {
					var c = a.createRange();
					c.selectNodeContents(b), c.collapse(!1), b.childNodes && b.childNodes[b.childNodes.length - 1] && "br" === b.childNodes[b.childNodes.length - 1].nodeName && (c.startOffset = c.endOffset = c.startOffset - 1), a.getSelection().setSingleRange(c)
				},
				insertHtml: function(b, e) {
					var i, j, k, l, m, n, o, p = angular.element("<div>" + b + "</div>"),
						q = a.getSelection().getRangeAt(0),
						r = d.createDocumentFragment(),
						s = p[0].childNodes,
						t = !0;
					if (s.length > 0) {
						for (l = [], k = 0; k < s.length; k++) "p" === s[k].nodeName.toLowerCase() && "" === s[k].innerHTML.trim() || 3 === s[k].nodeType && "" === s[k].nodeValue.trim() || (t = t && !f.test(s[k].nodeName), l.push(s[k]));
						for (var u = 0; u < l.length; u++) n = r.appendChild(l[u]);
						!t && q.collapsed && /^(|<br(|\/)>)$/i.test(q.startContainer.innerHTML) && q.selectNode(q.startContainer)
					} else t = !0, n = r = d.createTextNode(b);
					if (t) q.deleteContents();
					else if (q.collapsed && q.startContainer !== e)
						if (q.startContainer.innerHTML && q.startContainer.innerHTML.match(/^<[^>]*>$/i)) i = q.startContainer, 1 === q.startOffset ? (q.setStartAfter(i), q.setEndAfter(i)) : (q.setStartBefore(i), q.setEndBefore(i));
						else {
							if (3 === q.startContainer.nodeType && q.startContainer.parentNode !== e)
								for (i = q.startContainer.parentNode, j = i.cloneNode(), c.splitNodes(i.childNodes, i, j, q.startContainer, q.startOffset); !h.test(i.nodeName);) {
									angular.element(i).after(j), i = i.parentNode;
									var v = j;
									j = i.cloneNode(), c.splitNodes(i.childNodes, i, j, v)
								} else i = q.startContainer, j = i.cloneNode(), c.splitNodes(i.childNodes, i, j, void 0, void 0, q.startOffset);
							if (angular.element(i).after(j), q.setStartAfter(i), q.setEndAfter(i), /^(|<br(|\/)>)$/i.test(i.innerHTML.trim()) && (q.setStartBefore(i), q.setEndBefore(i), angular.element(i).remove()), /^(|<br(|\/)>)$/i.test(j.innerHTML.trim()) && angular.element(j).remove(), "li" === i.nodeName.toLowerCase()) {
								for (o = d.createDocumentFragment(), m = 0; m < r.childNodes.length; m++) p = angular.element("<li>"), c.transferChildNodes(r.childNodes[m], p[0]), c.transferNodeAttributes(r.childNodes[m], p[0]), o.appendChild(p[0]);
								r = o, n && (n = r.childNodes[r.childNodes.length - 1], n = n.childNodes[n.childNodes.length - 1])
							}
						}
					else q.deleteContents();
					q.insertNode(r), n && g.setSelectionToElementEnd(n)
				}
			};
		return g
	}]).service("taDOM", function() {
		var a = {
			getByAttribute: function(b, c) {
				var d = [],
					e = b.children();
				return e.length && angular.forEach(e, function(b) {
					d = d.concat(a.getByAttribute(angular.element(b), c))
				}), void 0 !== b.attr(c) && d.push(b), d
			},
			transferChildNodes: function(a, b) {
				for (b.innerHTML = ""; a.childNodes.length > 0;) b.appendChild(a.childNodes[0]);
				return b
			},
			splitNodes: function(b, c, d, e, f, g) {
				if (!e && isNaN(g)) throw new Error("taDOM.splitNodes requires a splitNode or splitIndex");
				for (var h = document.createDocumentFragment(), i = document.createDocumentFragment(), j = 0; b.length > 0 && (isNaN(g) || g !== j) && b[0] !== e;) h.appendChild(b[0]), j++;
				for (!isNaN(f) && f >= 0 && b[0] && (h.appendChild(document.createTextNode(b[0].nodeValue.substring(0, f))), b[0].nodeValue = b[0].nodeValue.substring(f)); b.length > 0;) i.appendChild(b[0]);
				a.transferChildNodes(h, c), a.transferChildNodes(i, d)
			},
			transferNodeAttributes: function(a, b) {
				for (var c = 0; c < a.attributes.length; c++) b.setAttribute(a.attributes[c].name, a.attributes[c].value);
				return b
			}
		};
		return a
	}), angular.module("textAngular.validators", []).directive("taMaxText", function() {
		return {
			restrict: "A",
			require: "ngModel",
			link: function(a, b, c, d) {
				var e = parseInt(a.$eval(c.taMaxText));
				if (isNaN(e)) throw "Max text must be an integer";
				c.$observe("taMaxText", function(a) {
					if (e = parseInt(a), isNaN(e)) throw "Max text must be an integer";
					d.$dirty && d.$validate()
				}), d.$validators.taMaxText = function(a) {
					var b = angular.element("<div/>");
					return b.html(a), b.text().length <= e
				}
			}
		}
	}).directive("taMinText", function() {
		return {
			restrict: "A",
			require: "ngModel",
			link: function(a, b, c, d) {
				var e = parseInt(a.$eval(c.taMinText));
				if (isNaN(e)) throw "Min text must be an integer";
				c.$observe("taMinText", function(a) {
					if (e = parseInt(a), isNaN(e)) throw "Min text must be an integer";
					d.$dirty && d.$validate()
				}), d.$validators.taMinText = function(a) {
					var b = angular.element("<div/>");
					return b.html(a), !b.text().length || b.text().length >= e
				}
			}
		}
	}), angular.module("textAngular.taBind", ["textAngular.factories", "textAngular.DOM"]).service("_taBlankTest", [function() {
		var a = /<(a|abbr|acronym|bdi|bdo|big|cite|code|del|dfn|img|ins|kbd|label|map|mark|q|ruby|rp|rt|s|samp|time|tt|var|table)[^>]*(>|$)/i;
		return function(b) {
			return function(c) {
				if (!c) return !0;
				var d, e = /(^[^<]|>)[^<]/i.exec(c);
				return e ? d = e.index : (c = c.toString().replace(/="[^"]*"/i, "").replace(/="[^"]*"/i, "").replace(/="[^"]*"/i, "").replace(/="[^"]*"/i, ""), d = c.indexOf(">")), c = c.trim().substring(d, d + 100), /^[^<>]+$/i.test(c) ? !1 : 0 === c.length || c === b || /^>(\s|&nbsp;)*<\/[^>]+>$/gi.test(c) ? !0 : />\s*[^\s<]/i.test(c) || a.test(c) ? !1 : !0
			}
		}
	}]).directive("taButton", [function() {
		return {
			link: function(a, b, c) {
				b.attr("unselectable", "on"), b.on("mousedown", function(a, b) {
					return b && angular.extend(a, b), a.preventDefault(), !1
				})
			}
		}
	}]).directive("taBind", ["taSanitize", "$timeout", "$document", "taFixChrome", "taBrowserTag", "taSelection", "taSelectableElements", "taApplyCustomRenderers", "taOptions", "_taBlankTest", "$parse", "taDOM", "textAngularManager", function(b, c, d, g, i, l, m, n, o, p, r, s, t) {
		return {
			priority: 2,
			require: ["ngModel", "?ngModelOptions"],
			link: function(i, u, v, w) {
				function x(a) {
					var b;
					return Q.forEach(function(c) {
						if (c.keyCode === a.keyCode) {
							var d = (a.metaKey ? N : 0) + (a.ctrlKey ? M : 0) + (a.shiftKey ? P : 0) + (a.altKey ? O : 0);
							if (c.forbiddenModifiers & d) return;
							c.mustHaveModifiers.every(function(a) {
								return d & a
							}) && (b = c.specialKey)
						}
					}), b
				}
				var y, z, A, B, C = w[0],
					D = w[1] || {},
					E = void 0 !== u.attr("contenteditable") && u.attr("contenteditable"),
					F = E || "textarea" === u[0].tagName.toLowerCase() || "input" === u[0].tagName.toLowerCase(),
					G = !1,
					H = !1,
					I = !1,
					J = v.taUnsafeSanitizer || o.disableSanitizer,
					K = /^(9|19|20|27|33|34|35|36|37|38|39|40|45|112|113|114|115|116|117|118|119|120|121|122|123|144|145)$/i,
					L = /^(8|13|32|46|59|61|107|109|173|186|187|188|189|190|191|192|219|220|221|222)$/i,
					M = 1,
					N = 2,
					O = 4,
					P = 8,
					Q = [{
						specialKey: "UndoKey",
						forbiddenModifiers: O + P,
						mustHaveModifiers: [N + M],
						keyCode: 90
					}, {
						specialKey: "RedoKey",
						forbiddenModifiers: O,
						mustHaveModifiers: [N + M, P],
						keyCode: 90
					}, {
						specialKey: "RedoKey",
						forbiddenModifiers: O + P,
						mustHaveModifiers: [N + M],
						keyCode: 89
					}, {
						specialKey: "TabKey",
						forbiddenModifiers: N + P + O + M,
						mustHaveModifiers: [],
						keyCode: 9
					}, {
						specialKey: "ShiftTabKey",
						forbiddenModifiers: N + O + M,
						mustHaveModifiers: [P],
						keyCode: 9
					}];
				void 0 === v.taDefaultWrap && (v.taDefaultWrap = "p"), "" === v.taDefaultWrap ? (A = "", B = void 0 === e.ie ? "<div><br></div>" : e.ie >= 11 ? "<p><br></p>" : e.ie <= 8 ? "<P>&nbsp;</P>" : "<p>&nbsp;</p>") : (A = void 0 === e.ie || e.ie >= 11 ? "<" + v.taDefaultWrap + "><br></" + v.taDefaultWrap + ">" : e.ie <= 8 ? "<" + v.taDefaultWrap.toUpperCase() + "></" + v.taDefaultWrap.toUpperCase() + ">" : "<" + v.taDefaultWrap + "></" + v.taDefaultWrap + ">", B = void 0 === e.ie || e.ie >= 11 ? "<" + v.taDefaultWrap + "><br></" + v.taDefaultWrap + ">" : e.ie <= 8 ? "<" + v.taDefaultWrap.toUpperCase() + ">&nbsp;</" + v.taDefaultWrap.toUpperCase() + ">" : "<" + v.taDefaultWrap + ">&nbsp;</" + v.taDefaultWrap + ">"), D.$options || (D.$options = {});
				var R = p(B),
					S = function(a) {
						if (R(a)) return a;
						var b = angular.element("<div>" + a + "</div>");
						if (0 === b.children().length) a = "<" + v.taDefaultWrap + ">" + a + "</" + v.taDefaultWrap + ">";
						else {
							var c, d = b[0].childNodes,
								e = !1;
							for (c = 0; c < d.length && !(e = d[c].nodeName.toLowerCase().match(f)); c++);
							if (e)
								for (a = "", c = 0; c < d.length; c++) {
									var g = d[c],
										h = g.nodeName.toLowerCase();
									if ("#comment" === h) a += "<!--" + g.nodeValue + "-->";
									else if ("#text" === h) {
										var i = g.textContent;
										a += i.trim() ? "<" + v.taDefaultWrap + ">" + i + "</" + v.taDefaultWrap + ">" : i
									} else if (h.match(f)) a += g.outerHTML;
									else {
										var j = g.outerHTML || g.nodeValue;
										a += "" !== j.trim() ? "<" + v.taDefaultWrap + ">" + j + "</" + v.taDefaultWrap + ">" : j
									}
								} else a = "<" + v.taDefaultWrap + ">" + a + "</" + v.taDefaultWrap + ">"
						}
						return a
					};
				v.taPaste && (z = r(v.taPaste)), u.addClass("ta-bind");
				var T;
				i["$undoManager" + (v.id || "")] = C.$undoManager = {
					_stack: [],
					_index: 0,
					_max: 1e3,
					push: function(a) {
						return "undefined" == typeof a || null === a || "undefined" != typeof this.current() && null !== this.current() && a === this.current() ? a : (this._index < this._stack.length - 1 && (this._stack = this._stack.slice(0, this._index + 1)), this._stack.push(a), T && c.cancel(T), this._stack.length > this._max && this._stack.shift(), this._index = this._stack.length - 1, a)
					},
					undo: function() {
						return this.setToIndex(this._index - 1)
					},
					redo: function() {
						return this.setToIndex(this._index + 1)
					},
					setToIndex: function(a) {
						return 0 > a || a > this._stack.length - 1 ? void 0 : (this._index = a, this.current())
					},
					current: function() {
						return this._stack[this._index]
					}
				};
				var U, V = i["$undoTaBind" + (v.id || "")] = function() {
						if (!G && E) {
							var a = C.$undoManager.undo();
							"undefined" != typeof a && null !== a && (ja(a), Y(a, !1), U && c.cancel(U), U = c(function() {
								u[0].focus(), l.setSelectionToElementEnd(u[0])
							}, 1))
						}
					},
					W = i["$redoTaBind" + (v.id || "")] = function() {
						if (!G && E) {
							var a = C.$undoManager.redo();
							"undefined" != typeof a && null !== a && (ja(a), Y(a, !1), U && c.cancel(U), U = c(function() {
								u[0].focus(), l.setSelectionToElementEnd(u[0])
							}, 1))
						}
					},
					X = function() {
						if (E) return u[0].innerHTML;
						if (F) return u.val();
						throw "textAngular Error: attempting to update non-editable taBind"
					},
					Y = function(a, b, c) {
						I = c || !1, ("undefined" == typeof b || null === b) && (b = !0 && E), ("undefined" == typeof a || null === a) && (a = X()), R(a) ? ("" !== C.$viewValue && C.$setViewValue(""), b && "" !== C.$undoManager.current() && C.$undoManager.push("")) : (ia(), C.$viewValue !== a && (C.$setViewValue(a), b && C.$undoManager.push(a))), C.$render()
					};
				i["updateTaBind" + (v.id || "")] = function() {
					G || Y(void 0, void 0, !0)
				};
				var Z = function(a) {
					return C.$oldViewValue = b(g(a), C.$oldViewValue, J)
				};
				if (u.attr("required") && (C.$validators.required = function(a, b) {
						return !R(a || b)
					}), C.$parsers.push(Z), C.$parsers.unshift(S), C.$formatters.push(Z), C.$formatters.unshift(S), C.$formatters.unshift(function(a) {
						return C.$undoManager.push(a || "")
					}), F)
					if (i.events = {}, E) {
						var $ = !1,
							_ = function(a) {
								var d = void 0 !== a ? a.match(/content=["']*OneNote.File/i) : !1;
								if (a && a.trim().length) {
									if (a.match(/class=["']*Mso(Normal|List)/i) || a.match(/content=["']*Word.Document/i) || a.match(/content=["']*OneNote.File/i)) {
										var e = a.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);
										e = e ? e[1] : a, e = e.replace(/<o:p>[\s\S]*?<\/o:p>/gi, "").replace(/class=(["']|)MsoNormal(["']|)/gi, "");
										var f = angular.element("<div>" + e + "</div>"),
											g = angular.element("<div></div>"),
											h = {
												element: null,
												lastIndent: [],
												lastLi: null,
												isUl: !1
											};
										h.lastIndent.peek = function() {
											var a = this.length;
											return a > 0 ? this[a - 1] : void 0
										};
										for (var j = function(a) {
											h.isUl = a, h.element = angular.element(a ? "<ul>" : "<ol>"), h.lastIndent = [], h.lastIndent.peek = function() {
												var a = this.length;
												return a > 0 ? this[a - 1] : void 0
											}, h.lastLevelMatch = null
										}, k = 0; k <= f[0].childNodes.length; k++)
											if (f[0].childNodes[k] && "#text" !== f[0].childNodes[k].nodeName) {
												var m = f[0].childNodes[k].tagName.toLowerCase();
												if ("p" === m || "h1" === m || "h2" === m || "h3" === m || "h4" === m || "h5" === m || "h6" === m) {
													var n = angular.element(f[0].childNodes[k]),
														o = (n.attr("class") || "").match(/MsoList(Bullet|Number|Paragraph)(CxSp(First|Middle|Last)|)/i);
													if (o) {
														if (n[0].childNodes.length < 2 || n[0].childNodes[1].childNodes.length < 1) continue;
														var p = "bullet" === o[1].toLowerCase() || "number" !== o[1].toLowerCase() && !(/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(n[0].childNodes[1].innerHTML) || /^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(n[0].childNodes[1].childNodes[0].innerHTML)),
															q = (n.attr("style") || "").match(/margin-left:([\-\.0-9]*)/i),
															r = parseFloat(q ? q[1] : 0),
															t = (n.attr("style") || "").match(/mso-list:l([0-9]+) level([0-9]+) lfo[0-9+]($|;)/i);
														if (t && t[2] && (r = parseInt(t[2])), t && (!h.lastLevelMatch || t[1] !== h.lastLevelMatch[1]) || !o[3] || "first" === o[3].toLowerCase() || null === h.lastIndent.peek() || h.isUl !== p && h.lastIndent.peek() === r) j(p), g.append(h.element);
														else if (null != h.lastIndent.peek() && h.lastIndent.peek() < r) h.element = angular.element(p ? "<ul>" : "<ol>"), h.lastLi.append(h.element);
														else if (null != h.lastIndent.peek() && h.lastIndent.peek() > r) {
															for (; null != h.lastIndent.peek() && h.lastIndent.peek() > r;)
																if ("li" !== h.element.parent()[0].tagName.toLowerCase()) {
																	if (!/[uo]l/i.test(h.element.parent()[0].tagName.toLowerCase())) break;
																	h.element = h.element.parent(), h.lastIndent.pop()
																} else h.element = h.element.parent();
															h.isUl = "ul" === h.element[0].tagName.toLowerCase(), p !== h.isUl && (j(p), g.append(h.element))
														}
														h.lastLevelMatch = t, r !== h.lastIndent.peek() && h.lastIndent.push(r), h.lastLi = angular.element("<li>"), h.element.append(h.lastLi), h.lastLi.html(n.html().replace(/<!(--|)\[if !supportLists\](--|)>[\s\S]*?<!(--|)\[endif\](--|)>/gi, "")), n.remove()
													} else j(!1), g.append(n)
												}
											}
										var v = function(a) {
											a = angular.element(a);
											for (var b = a[0].childNodes.length - 1; b >= 0; b--) a.after(a[0].childNodes[b]);
											a.remove()
										};
										angular.forEach(g.find("span"), function(a) {
											a.removeAttribute("lang"), a.attributes.length <= 0 && v(a)
										}), angular.forEach(g.find("font"), v), a = g.html(), d && (a = g.html() || f.html())
									} else {
										if (a = a.replace(/<(|\/)meta[^>]*?>/gi, ""), a.match(/<[^>]*?(ta-bind)[^>]*?>/)) {
											if (a.match(/<[^>]*?(text-angular)[^>]*?>/)) {
												var w = angular.element("<div>" + a + "</div>");
												w.find("textarea").remove();
												for (var x = s.getByAttribute(w, "ta-bind"), y = 0; y < x.length; y++) {
													for (var A = x[y][0].parentNode.parentNode, B = 0; B < x[y][0].childNodes.length; B++) A.parentNode.insertBefore(x[y][0].childNodes[B], A);
													A.parentNode.removeChild(A)
												}
												a = w.html().replace('<br class="Apple-interchange-newline">', "")
											}
										} else a.match(/^<span/) && (a.match(/<span class=(\"Apple-converted-space\"|\'Apple-converted-space\')>.<\/span>/gi) || (a = a.replace(/<(|\/)span[^>]*?>/gi, "")));
										a = a.replace(/<br class="Apple-interchange-newline"[^>]*?>/gi, "").replace(/<span class="Apple-converted-space">( |&nbsp;)<\/span>/gi, "&nbsp;")
									}
								/<li(\s.*)?>/i.test(a) && /(<ul(\s.*)?>|<ol(\s.*)?>).*<li(\s.*)?>/i.test(a) === !1 && (a = a.replace(/<li(\s.*)?>.*<\/li(\s.*)?>/i, "<ul>$&</ul>")), a = a.replace(/^[ |\u00A0]+/gm, function(a) {
										for (var b = "", c = 0; c < a.length; c++) b += "&nbsp;";
										return b
									}).replace(/\n|\r\n|\r/g, "<br />").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"), z && (a = z(i, {
											$html: a
										}) || a), a = b(a, "", J), l.insertHtml(a, u[0]), c(function() {
										C.$setViewValue(X()), $ = !1, u.removeClass("processing-paste")
									}, 0)
								} else $ = !1, u.removeClass("processing-paste")
							};
						u.on("paste", i.events.paste = function(b, e) {
							if (e && angular.extend(b, e), G || $) return b.stopPropagation(), b.preventDefault(), !1;
							$ = !0, u.addClass("processing-paste");
							var f, g = (b.originalEvent || b).clipboardData;
							if (g && g.getData && g.types.length > 0) {
								for (var h = "", i = 0; i < g.types.length; i++) h += " " + g.types[i];
								return /text\/html/i.test(h) ? f = g.getData("text/html") : /text\/plain/i.test(h) && (f = g.getData("text/plain")), _(f), b.stopPropagation(), b.preventDefault(), !1
							}
							var j = a.saveSelection(),
								k = angular.element('<div class="ta-hidden-input" contenteditable="true"></div>');
							d.find("body").append(k), k[0].focus(), c(function() {
								a.restoreSelection(j), _(k[0].innerHTML), u[0].focus(), k.remove()
							}, 0)
						}), u.on("cut", i.events.cut = function(a) {
							G ? a.preventDefault() : c(function() {
								C.$setViewValue(X())
							}, 0)
						}), u.on("keydown", i.events.keydown = function(a, b) {
							b && angular.extend(a, b), a.specialKey = x(a);
							var c;
							if (o.keyMappings.forEach(function(b) {
									a.specialKey === b.commandKeyCode && (a.specialKey = void 0), b.testForKey(a) && (c = b.commandKeyCode), ("UndoKey" === b.commandKeyCode || "RedoKey" === b.commandKeyCode) && (b.enablePropagation || a.preventDefault())
								}), "undefined" != typeof c && (a.specialKey = c), "undefined" == typeof a.specialKey || "UndoKey" === a.specialKey && "RedoKey" === a.specialKey || (a.preventDefault(), t.sendKeyCommand(i, a)), !G && ("UndoKey" === a.specialKey && (V(), a.preventDefault()), "RedoKey" === a.specialKey && (W(), a.preventDefault()), 13 === a.keyCode && !a.shiftKey)) {
								var d, e = function(a, b) {
										for (var c = 0; c < a.length; c++)
											if (a[c] === b) return !0;
										return !1
									},
									f = l.getSelectionElement();
								if (!f.tagName.match(h)) return;
								var g = angular.element(A),
									j = ["blockquote", "ul", "ol"];
								if (e(j, f.parentNode.tagName.toLowerCase())) {
									if (/^<br(|\/)>$/i.test(f.innerHTML.trim()) && !f.nextSibling) {
										d = angular.element(f);
										var k = d.parent();
										k.after(g), d.remove(), 0 === k.children().length && k.remove(), l.setSelectionToElementStart(g[0]), a.preventDefault()
									}
								/^<[^>]+><br(|\/)><\/[^>]+>$/i.test(f.innerHTML.trim()) && (d = angular.element(f), d.after(g), d.remove(), l.setSelectionToElementStart(g[0]), a.preventDefault())
								}
							}
						});
						var aa;
						if (u.on("keyup", i.events.keyup = function(a, b) {
								if (b && angular.extend(a, b), 9 === a.keyCode) {
									var d = l.getSelection();
									return void(d.start.element === u[0] && u.children().length && l.setSelectionToElementStart(u.children()[0]))
								}
								if (T && c.cancel(T), !G && !K.test(a.keyCode)) {
									if ("" !== A && 13 === a.keyCode && !a.shiftKey) {
										for (var e = l.getSelectionElement(); !e.tagName.match(h) && e !== u[0];) e = e.parentNode;
										if (e.tagName.toLowerCase() !== v.taDefaultWrap && "li" !== e.tagName.toLowerCase() && ("" === e.innerHTML.trim() || "<br>" === e.innerHTML.trim())) {
											var f = angular.element(A);
											angular.element(e).replaceWith(f), l.setSelectionToElementStart(f[0])
										}
									}
									var g = X();
									"<br>" === g && (g = ""), "" !== A && "" === g.trim() ? (ja(A), l.setSelectionToElementStart(u.children()[0])) : "<" !== g.substring(0, 1) && "" !== v.taDefaultWrap;
									var i = y !== a.keyCode && L.test(a.keyCode);
									aa && c.cancel(aa), aa = c(function() {
										Y(g, i, !0)
									}, D.$options.debounce || 400), i || (T = c(function() {
										C.$undoManager.push(g)
									}, 250)), y = a.keyCode
								}
							}), u.on("blur", i.events.blur = function() {
								H = !1, G ? (I = !0, C.$render()) : Y(void 0, void 0, !0)
							}), v.placeholder && (e.ie > 8 || void 0 === e.ie)) {
							var ba;
							if (!v.id) throw "textAngular Error: An unique ID is required for placeholders to work";
							ba = j("#" + v.id + ".placeholder-text:before", 'content: "' + v.placeholder + '"'), i.$on("$destroy", function() {
								k(ba)
							})
						}
						u.on("focus", i.events.focus = function() {
							H = !0, u.removeClass("placeholder-text"), ia()
						}), u.on("mouseup", i.events.mouseup = function() {
							var a = l.getSelection();
							a.start.element === u[0] && u.children().length && l.setSelectionToElementStart(u.children()[0])
						}), u.on("mousedown", i.events.mousedown = function(a, b) {
							b && angular.extend(a, b), a.stopPropagation()
						})
					} else {
						u.on("change blur", i.events.change = i.events.blur = function() {
							G || C.$setViewValue(X())
						}), u.on("keydown", i.events.keydown = function(a, b) {
							if (b && angular.extend(a, b), 9 === a.keyCode) {
								var c = this.selectionStart,
									d = this.selectionEnd,
									e = u.val();
								if (a.shiftKey) {
									var f = e.lastIndexOf("\n", c),
										g = e.lastIndexOf("	", c); - 1 !== g && g >= f && (u.val(e.substring(0, g) + e.substring(g + 1)), this.selectionStart = this.selectionEnd = c - 1)
								} else u.val(e.substring(0, c) + "	" + e.substring(d)), this.selectionStart = this.selectionEnd = c + 1;
								a.preventDefault()
							}
						});
						var ca = function(a, b) {
								for (var c = "", d = 0; b > d; d++) c += a;
								return c
							},
							da = function(a, b, c) {
								for (var d = 0; d < a.length; d++) b.call(c, d, a[d])
							},
							ea = function(a, b) {
								var c = "",
									d = a.childNodes;
								return b++, c += ca("	", b - 1) + a.outerHTML.substring(0, 4), da(d, function(a, d) {
									var e = d.nodeName.toLowerCase();
									return "#comment" === e ? void(c += "<!--" + d.nodeValue + "-->") : "#text" === e ? void(c += d.textContent) : void(d.outerHTML && (c += "ul" === e || "ol" === e ? "\n" + ea(d, b) : "\n" + ca("	", b) + d.outerHTML))
								}), c += "\n" + ca("	", b - 1) + a.outerHTML.substring(a.outerHTML.lastIndexOf("<"))
							};
						C.$formatters.unshift(function(a) {
							var b = angular.element("<div>" + a + "</div>")[0].childNodes;
							return b.length > 0 && (a = "", da(b, function(b, c) {
								var d = c.nodeName.toLowerCase();
								return "#comment" === d ? void(a += "<!--" + c.nodeValue + "-->") : "#text" === d ? void(a += c.textContent) : void(c.outerHTML && (a.length > 0 && (a += "\n"), a += "ul" === d || "ol" === d ? "" + ea(c, 0) : "" + c.outerHTML))
							})), a
						})
					}
				var fa, ga = function(a) {
						return i.$emit("ta-element-select", this), a.preventDefault(), !1
					},
					ha = function(a, b) {
						if (b && angular.extend(a, b), !q && !G) {
							q = !0;
							var d;
							d = a.originalEvent ? a.originalEvent.dataTransfer : a.dataTransfer, i.$emit("ta-drop-event", this, a, d), c(function() {
								q = !1, Y(void 0, void 0, !0)
							}, 100)
						}
					},
					ia = i["reApplyOnSelectorHandlers" + (v.id || "")] = function() {
						G || angular.forEach(m, function(a) {
							u.find(a).off("click", ga).on("click", ga)
						})
					},
					ja = function(a) {
						u[0].innerHTML = a
					},
					ka = !1;
				C.$render = function() {
					if (!ka) {
						ka = !0;
						var a = C.$viewValue || "";
						I || (E && H && (u.removeClass("placeholder-text"), fa && c.cancel(fa), fa = c(function() {
							H || (u[0].focus(), l.setSelectionToElementEnd(u.children()[u.children().length - 1])), fa = void 0
						}, 1)), E ? (ja(v.placeholder ? "" === a ? A : a : "" === a ? A : a), G ? u.off("drop", ha) : (ia(), u.on("drop", ha))) : "textarea" !== u[0].tagName.toLowerCase() && "input" !== u[0].tagName.toLowerCase() ? ja(n(a)) : u.val(a)), E && v.placeholder && ("" === a ? H ? u.removeClass("placeholder-text") : u.addClass("placeholder-text") : u.removeClass("placeholder-text")), ka = I = !1
					}
				}, v.taReadonly && (G = i.$eval(v.taReadonly), G ? (u.addClass("ta-readonly"), ("textarea" === u[0].tagName.toLowerCase() || "input" === u[0].tagName.toLowerCase()) && u.attr("disabled", "disabled"), void 0 !== u.attr("contenteditable") && u.attr("contenteditable") && u.removeAttr("contenteditable")) : (u.removeClass("ta-readonly"), "textarea" === u[0].tagName.toLowerCase() || "input" === u[0].tagName.toLowerCase() ? u.removeAttr("disabled") : E && u.attr("contenteditable", "true")), i.$watch(v.taReadonly, function(a, b) {
					b !== a && (a ? (u.addClass("ta-readonly"), ("textarea" === u[0].tagName.toLowerCase() || "input" === u[0].tagName.toLowerCase()) && u.attr("disabled", "disabled"), void 0 !== u.attr("contenteditable") && u.attr("contenteditable") && u.removeAttr("contenteditable"), angular.forEach(m, function(a) {
						u.find(a).on("click", ga)
					}), u.off("drop", ha)) : (u.removeClass("ta-readonly"), "textarea" === u[0].tagName.toLowerCase() || "input" === u[0].tagName.toLowerCase() ? u.removeAttr("disabled") : E && u.attr("contenteditable", "true"), angular.forEach(m, function(a) {
						u.find(a).off("click", ga)
					}), u.on("drop", ha)), G = a)
				})), E && !G && (angular.forEach(m, function(a) {
					u.find(a).on("click", ga)
				}), u.on("drop", ha))
			}
		}
	}]);
	var q = !1,
		r = angular.module("textAngular", ["ngSanitize", "textAngularSetup", "textAngular.factories", "textAngular.DOM", "textAngular.validators", "textAngular.taBind"]);
	return r.config([function() {
		angular.forEach(d, function(a, b) {
			delete d[b]
		})
	}]), r.directive("textAngular", ["$compile", "$timeout", "taOptions", "taSelection", "taExecCommand", "textAngularManager", "$document", "$animate", "$log", "$q", "$parse", function(b, c, d, e, f, g, h, i, j, k, l) {
		return {
			require: "?ngModel",
			scope: {},
			restrict: "EA",
			priority: 2,
			link: function(m, n, o, p) {
				var q, r, s, t, u, v, w, x, y, z, A, B = o.serial ? o.serial : Math.floor(1e16 * Math.random());
				m._name = o.name ? o.name : "textAngularEditor" + B;
				var C = function(a, b, d) {
					c(function() {
						var c = function() {
							a.off(b, c), d.apply(this, arguments)
						};
						a.on(b, c)
					}, 100)
				};
				if (y = f(o.taDefaultWrap), angular.extend(m, angular.copy(d), {
						wrapSelection: function(a, b, c) {
							"undo" === a.toLowerCase() ? m["$undoTaBindtaTextElement" + B]() : "redo" === a.toLowerCase() ? m["$redoTaBindtaTextElement" + B]() : (y(a, !1, b, m.defaultTagAttributes), c && m["reApplyOnSelectorHandlerstaTextElement" + B](), m.displayElements.text[0].focus())
						},
						showHtml: m.$eval(o.taShowHtml) || !1
					}), o.taFocussedClass && (m.classes.focussed = o.taFocussedClass), o.taTextEditorClass && (m.classes.textEditor = o.taTextEditorClass), o.taHtmlEditorClass && (m.classes.htmlEditor = o.taHtmlEditorClass), o.taDefaultTagAttributes) try {
					angular.extend(m.defaultTagAttributes, angular.fromJson(o.taDefaultTagAttributes))
				} catch (D) {
					j.error(D)
				}
				o.taTextEditorSetup && (m.setup.textEditorSetup = m.$parent.$eval(o.taTextEditorSetup)), o.taHtmlEditorSetup && (m.setup.htmlEditorSetup = m.$parent.$eval(o.taHtmlEditorSetup)), o.taFileDrop ? m.fileDropHandler = m.$parent.$eval(o.taFileDrop) : m.fileDropHandler = m.defaultFileDropHandler, w = n[0].innerHTML, n[0].innerHTML = "", m.displayElements = {
					forminput: angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),
					html: angular.element("<textarea></textarea>"),
					text: angular.element("<div></div>"),
					scrollWindow: angular.element("<div class='ta-scroll-window'></div>"),
					popover: angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"></div>'),
					popoverArrow: angular.element('<div class="arrow"></div>'),
					popoverContainer: angular.element('<div class="popover-content"></div>'),
					resize: {
						overlay: angular.element('<div class="ta-resizer-handle-overlay"></div>'),
						background: angular.element('<div class="ta-resizer-handle-background"></div>'),
						anchors: [angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'), angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')],
						info: angular.element('<div class="ta-resizer-handle-info"></div>')
					}
				}, m.displayElements.popover.append(m.displayElements.popoverArrow), m.displayElements.popover.append(m.displayElements.popoverContainer), m.displayElements.scrollWindow.append(m.displayElements.popover), m.displayElements.popover.on("mousedown", function(a, b) {
					return b && angular.extend(a, b), a.preventDefault(), !1
				}), m.showPopover = function(a) {
					m.displayElements.popover.css("display", "block"), m.reflowPopover(a), i.addClass(m.displayElements.popover, "in"), C(h.find("body"), "click keyup", function() {
						m.hidePopover()
					})
				}, m.reflowPopover = function(a) {
					m.displayElements.text[0].offsetHeight - 51 > a[0].offsetTop ? (m.displayElements.popover.css("top", a[0].offsetTop + a[0].offsetHeight + m.displayElements.scrollWindow[0].scrollTop + "px"), m.displayElements.popover.removeClass("top").addClass("bottom")) : (m.displayElements.popover.css("top", a[0].offsetTop - 54 + m.displayElements.scrollWindow[0].scrollTop + "px"), m.displayElements.popover.removeClass("bottom").addClass("top"));
					var b = m.displayElements.text[0].offsetWidth - m.displayElements.popover[0].offsetWidth,
						c = a[0].offsetLeft + a[0].offsetWidth / 2 - m.displayElements.popover[0].offsetWidth / 2;
					m.displayElements.popover.css("left", Math.max(0, Math.min(b, c)) + "px"), m.displayElements.popoverArrow.css("margin-left", Math.min(c, Math.max(0, c - b)) - 11 + "px")
				}, m.hidePopover = function() {
					m.displayElements.popover.css("display", ""), m.displayElements.popoverContainer.attr("style", ""), m.displayElements.popoverContainer.attr("class", "popover-content"), m.displayElements.popover.removeClass("in")
				}, m.displayElements.resize.overlay.append(m.displayElements.resize.background), angular.forEach(m.displayElements.resize.anchors, function(a) {
					m.displayElements.resize.overlay.append(a)
				}), m.displayElements.resize.overlay.append(m.displayElements.resize.info), m.displayElements.scrollWindow.append(m.displayElements.resize.overlay), m.reflowResizeOverlay = function(a) {
					a = angular.element(a)[0], m.displayElements.resize.overlay.css({
						display: "block",
						left: a.offsetLeft - 5 + "px",
						top: a.offsetTop - 5 + "px",
						width: a.offsetWidth + 10 + "px",
						height: a.offsetHeight + 10 + "px"
					}), m.displayElements.resize.info.text(a.offsetWidth + " x " + a.offsetHeight)
				}, m.showResizeOverlay = function(a) {
					var b = h.find("body");
					z = function(c) {
						var d = {
							width: parseInt(a.attr("width")),
							height: parseInt(a.attr("height")),
							x: c.clientX,
							y: c.clientY
						};
						(void 0 === d.width || isNaN(d.width)) && (d.width = a[0].offsetWidth), (void 0 === d.height || isNaN(d.height)) && (d.height = a[0].offsetHeight), m.hidePopover();
						var e = d.height / d.width,
							f = function(b) {
								function c(a) {
									return Math.round(Math.max(0, a))
								}
								var f = {
										x: Math.max(0, d.width + (b.clientX - d.x)),
										y: Math.max(0, d.height + (b.clientY - d.y))
									},
									g = void 0 !== o.taResizeForceAspectRatio,
									h = o.taResizeMaintainAspectRatio,
									i = g || h && !b.shiftKey;
								if (i) {
									var j = f.y / f.x;
									f.x = e > j ? f.x : f.y / e, f.y = e > j ? f.x * e : f.y
								}
								var k = angular.element(a);
								k.css("height", c(f.y) + "px"), k.css("width", c(f.x) + "px"), m.reflowResizeOverlay(a)
							};
						b.on("mousemove", f), C(b, "mouseup", function(a) {
							a.preventDefault(), a.stopPropagation(), b.off("mousemove", f), m.$apply(function() {
								m.hidePopover(), m.updateTaBindtaTextElement()
							}, 100)
						}), c.stopPropagation(), c.preventDefault()
					}, m.displayElements.resize.anchors[3].off("mousedown"), m.displayElements.resize.anchors[3].on("mousedown", z), m.reflowResizeOverlay(a), C(b, "click", function() {
						m.hideResizeOverlay()
					})
				}, m.hideResizeOverlay = function() {
					m.displayElements.resize.anchors[3].off("mousedown", z), m.displayElements.resize.overlay.css("display", "")
				}, m.setup.htmlEditorSetup(m.displayElements.html), m.setup.textEditorSetup(m.displayElements.text), m.displayElements.html.attr({
					id: "taHtmlElement" + B,
					"ng-show": "showHtml",
					"ta-bind": "ta-bind",
					"ng-model": "html",
					"ng-model-options": n.attr("ng-model-options")
				}), m.displayElements.text.attr({
					id: "taTextElement" + B,
					contentEditable: "true",
					"ta-bind": "ta-bind",
					"ng-model": "html",
					"ng-model-options": n.attr("ng-model-options")
				}), m.displayElements.scrollWindow.attr({
					"ng-hide": "showHtml"
				}), o.taDefaultWrap && m.displayElements.text.attr("ta-default-wrap", o.taDefaultWrap), o.taUnsafeSanitizer && (m.displayElements.text.attr("ta-unsafe-sanitizer", o.taUnsafeSanitizer), m.displayElements.html.attr("ta-unsafe-sanitizer", o.taUnsafeSanitizer)), m.displayElements.scrollWindow.append(m.displayElements.text), n.append(m.displayElements.scrollWindow), n.append(m.displayElements.html), m.displayElements.forminput.attr("name", m._name), n.append(m.displayElements.forminput), o.tabindex && (n.removeAttr("tabindex"), m.displayElements.text.attr("tabindex", o.tabindex), m.displayElements.html.attr("tabindex", o.tabindex)), o.placeholder && (m.displayElements.text.attr("placeholder", o.placeholder), m.displayElements.html.attr("placeholder", o.placeholder)), o.taDisabled && (m.displayElements.text.attr("ta-readonly", "disabled"), m.displayElements.html.attr("ta-readonly", "disabled"), m.disabled = m.$parent.$eval(o.taDisabled), m.$parent.$watch(o.taDisabled, function(a) {
					m.disabled = a, m.disabled ? n.addClass(m.classes.disabled) : n.removeClass(m.classes.disabled)
				})), o.taPaste && (m._pasteHandler = function(a) {
					return l(o.taPaste)(m.$parent, {
						$html: a
					})
				}, m.displayElements.text.attr("ta-paste", "_pasteHandler($html)")), b(m.displayElements.scrollWindow)(m), b(m.displayElements.html)(m), m.updateTaBindtaTextElement = m["updateTaBindtaTextElement" + B], m.updateTaBindtaHtmlElement = m["updateTaBindtaHtmlElement" + B], n.addClass("ta-root"), m.displayElements.scrollWindow.addClass("ta-text ta-editor " + m.classes.textEditor), m.displayElements.html.addClass("ta-html ta-editor " + m.classes.htmlEditor), m._actionRunning = !1;
				var E = !1;
				if (m.startAction = function() {
						return m._actionRunning = !0, E = a.saveSelection(),
							function() {
								E && a.restoreSelection(E)
							}
					}, m.endAction = function() {
						m._actionRunning = !1, E && (m.showHtml ? m.displayElements.html[0].focus() : m.displayElements.text[0].focus(), a.removeMarkers(E)), E = !1, m.updateSelectedStyles(), m.showHtml || m["updateTaBindtaTextElement" + B]()
					}, u = function() {
						m.focussed = !0, n.addClass(m.classes.focussed), x.focus(), n.triggerHandler("focus")
					}, m.displayElements.html.on("focus", u), m.displayElements.text.on("focus", u), v = function(a) {
						return m._actionRunning || h[0].activeElement === m.displayElements.html[0] || h[0].activeElement === m.displayElements.text[0] || (n.removeClass(m.classes.focussed), x.unfocus(), c(function() {
							m._bUpdateSelectedStyles = !1, n.triggerHandler("blur"), m.focussed = !1
						}, 0)), a.preventDefault(), !1
					}, m.displayElements.html.on("blur", v), m.displayElements.text.on("blur", v), m.displayElements.text.on("paste", function(a) {
						n.triggerHandler("paste", a)
					}), m.queryFormatBlockState = function(a) {
						return !m.showHtml && a.toLowerCase() === h[0].queryCommandValue("formatBlock").toLowerCase()
					}, m.queryCommandState = function(a) {
						return m.showHtml ? "" : h[0].queryCommandState(a)
					}, m.switchView = function() {
						m.showHtml = !m.showHtml, i.enabled(!1, m.displayElements.html), i.enabled(!1, m.displayElements.text), m.showHtml ? c(function() {
							return i.enabled(!0, m.displayElements.html), i.enabled(!0, m.displayElements.text), m.displayElements.html[0].focus()
						}, 100) : c(function() {
							return i.enabled(!0, m.displayElements.html), i.enabled(!0, m.displayElements.text), m.displayElements.text[0].focus()
						}, 100)
					}, o.ngModel) {
					var F = !0;
					p.$render = function() {
						if (F) {
							F = !1;
							var a = m.$parent.$eval(o.ngModel);
							void 0 !== a && null !== a || !w || "" === w || p.$setViewValue(w)
						}
						m.displayElements.forminput.val(p.$viewValue), m.html = p.$viewValue || ""
					}, n.attr("required") && (p.$validators.required = function(a, b) {
						var c = a || b;
						return !(!c || "" === c.trim())
					})
				} else m.displayElements.forminput.val(w), m.html = w;
				if (m.$watch("html", function(a, b) {
						a !== b && (o.ngModel && p.$viewValue !== a && p.$setViewValue(a), m.displayElements.forminput.val(a))
					}), o.taTargetToolbars) x = g.registerEditor(m._name, m, o.taTargetToolbars.split(","));
				else {
					var G = angular.element('<div text-angular-toolbar name="textAngularToolbar' + B + '">');
					o.taToolbar && G.attr("ta-toolbar", o.taToolbar), o.taToolbarClass && G.attr("ta-toolbar-class", o.taToolbarClass), o.taToolbarGroupClass && G.attr("ta-toolbar-group-class", o.taToolbarGroupClass), o.taToolbarButtonClass && G.attr("ta-toolbar-button-class", o.taToolbarButtonClass), o.taToolbarActiveButtonClass && G.attr("ta-toolbar-active-button-class", o.taToolbarActiveButtonClass), o.taFocussedClass && G.attr("ta-focussed-class", o.taFocussedClass), n.prepend(G), b(G)(m.$parent), x = g.registerEditor(m._name, m, ["textAngularToolbar" + B])
				}
				m.$on("$destroy", function() {
					g.unregisterEditor(m._name), angular.element(window).off("blur")
				}), m.$on("ta-element-select", function(a, b) {
					x.triggerElementSelect(a, b) && m["reApplyOnSelectorHandlerstaTextElement" + B]()
				}), m.$on("ta-drop-event", function(a, b, d, e) {
					m.displayElements.text[0].focus(), e && e.files && e.files.length > 0 ? (angular.forEach(e.files, function(a) {
						try {
							k.when(m.fileDropHandler(a, m.wrapSelection) || m.fileDropHandler !== m.defaultFileDropHandler && k.when(m.defaultFileDropHandler(a, m.wrapSelection))).then(function() {
								m["updateTaBindtaTextElement" + B]()
							})
						} catch (b) {
							j.error(b)
						}
					}), d.preventDefault(), d.stopPropagation()) : c(function() {
						m["updateTaBindtaTextElement" + B]()
					}, 0)
				}), m._bUpdateSelectedStyles = !1, angular.element(window).on("blur", function() {
					m._bUpdateSelectedStyles = !1, m.focussed = !1
				}), m.updateSelectedStyles = function() {
					var a;
					A && c.cancel(A), void 0 !== (a = e.getSelectionElement()) && a.parentNode !== m.displayElements.text[0] ? x.updateSelectedStyles(angular.element(a)) : x.updateSelectedStyles(), m._bUpdateSelectedStyles && (A = c(m.updateSelectedStyles, 200))
				}, q = function() {
					return m.focussed ? void(m._bUpdateSelectedStyles || (m._bUpdateSelectedStyles = !0, m.$apply(function() {
						m.updateSelectedStyles()
					}))) : void(m._bUpdateSelectedStyles = !1)
				}, m.displayElements.html.on("keydown", q), m.displayElements.text.on("keydown", q), r = function() {
					m._bUpdateSelectedStyles = !1
				}, m.displayElements.html.on("keyup", r), m.displayElements.text.on("keyup", r), s = function(a, b) {
					b && angular.extend(a, b), m.$apply(function() {
						return x.sendKeyCommand(a) ? (m._bUpdateSelectedStyles || m.updateSelectedStyles(), a.preventDefault(), !1) : void 0
					})
				}, m.displayElements.html.on("keypress", s), m.displayElements.text.on("keypress", s), t = function() {
					m._bUpdateSelectedStyles = !1, m.$apply(function() {
						m.updateSelectedStyles()
					})
				}, m.displayElements.html.on("mouseup", t), m.displayElements.text.on("mouseup", t)
			}
		}
	}]), r.service("textAngularManager", ["taToolExecuteAction", "taTools", "taRegisterTool", "$interval", "$rootScope", function(a, b, c, d, e) {
		var f, g = {},
			h = {},
			i = [],
			j = 0,
			k = function(a) {
				angular.forEach(h, function(b) {
					b.editorFunctions.updateSelectedStyles(a)
				})
			},
			l = 50,
			m = function() {
				j = Date.now(), f = d(function() {
					k(), f = void 0
				}, l, 1)
			};
		e.$on("destroy", function() {
			f && (d.cancel(f), f = void 0)
		});
		var n = function() {
			Math.abs(Date.now() - j) > l && m()
		};
		return {
			registerEditor: function(c, d, e) {
				if (!c || "" === c) throw "textAngular Error: An editor requires a name";
				if (!d) throw "textAngular Error: An editor requires a scope";
				if (h[c]) throw 'textAngular Error: An Editor with name "' + c + '" already exists';
				return angular.forEach(e, function(a) {
					g[a] && i.push(g[a])
				}), h[c] = {
					scope: d,
					toolbars: e,
					_registerToolbarScope: function(a) {
						this.toolbars.indexOf(a.name) >= 0 && i.push(a)
					},
					editorFunctions: {
						disable: function() {
							angular.forEach(i, function(a) {
								a.disabled = !0
							})
						},
						enable: function() {
							angular.forEach(i, function(a) {
								a.disabled = !1
							})
						},
						focus: function() {
							angular.forEach(i, function(a) {
								a._parent = d, a.disabled = !1, a.focussed = !0, d.focussed = !0
							})
						},
						unfocus: function() {
							angular.forEach(i, function(a) {
								a.disabled = !0, a.focussed = !1
							}), d.focussed = !1
						},
						updateSelectedStyles: function(a) {
							angular.forEach(i, function(b) {
								angular.forEach(b.tools, function(c) {
									c.activeState && (b._parent = d, c.active = c.activeState(a))
								})
							})
						},
						sendKeyCommand: function(c) {
							var e = !1;
							return (c.ctrlKey || c.metaKey || c.specialKey) && angular.forEach(b, function(b, f) {
								if (b.commandKeyCode && (b.commandKeyCode === c.which || b.commandKeyCode === c.specialKey))
									for (var g = 0; g < i.length; g++)
										if (void 0 !== i[g].tools[f]) {
											a.call(i[g].tools[f], d), e = !0;
											break
										}
							}), e
						},
						triggerElementSelect: function(a, c) {
							var e = function(a, b) {
									for (var c = !0, d = 0; d < b.length; d++) c = c && a.attr(b[d]);
									return c
								},
								f = [],
								g = {},
								h = !1;
							c = angular.element(c);
							var j = !1;
							if (angular.forEach(b, function(a, b) {
									a.onElementSelect && a.onElementSelect.element && a.onElementSelect.element.toLowerCase() === c[0].tagName.toLowerCase() && (!a.onElementSelect.filter || a.onElementSelect.filter(c)) && (j = j || angular.isArray(a.onElementSelect.onlyWithAttrs) && e(c, a.onElementSelect.onlyWithAttrs),
									(!a.onElementSelect.onlyWithAttrs || e(c, a.onElementSelect.onlyWithAttrs)) && (g[b] = a))
								}), j ? (angular.forEach(g, function(a, b) {
									a.onElementSelect.onlyWithAttrs && e(c, a.onElementSelect.onlyWithAttrs) && f.push({
										name: b,
										tool: a
									})
								}), f.sort(function(a, b) {
									return b.tool.onElementSelect.onlyWithAttrs.length - a.tool.onElementSelect.onlyWithAttrs.length
								})) : angular.forEach(g, function(a, b) {
									f.push({
										name: b,
										tool: a
									})
								}), f.length > 0)
								for (var k = 0; k < f.length; k++) {
									for (var l = f[k].tool, m = f[k].name, n = 0; n < i.length; n++)
										if (void 0 !== i[n].tools[m]) {
											l.onElementSelect.action.call(i[n].tools[m], a, c, d), h = !0;
											break
										}
									if (h) break
								}
							return h
						}
					}
				}, n(), h[c].editorFunctions
			},
			retrieveEditor: function(a) {
				return h[a]
			},
			unregisterEditor: function(a) {
				delete h[a], n()
			},
			registerToolbar: function(a) {
				if (!a) throw "textAngular Error: A toolbar requires a scope";
				if (!a.name || "" === a.name) throw "textAngular Error: A toolbar requires a name";
				if (g[a.name]) throw 'textAngular Error: A toolbar with name "' + a.name + '" already exists';
				g[a.name] = a, angular.forEach(h, function(b) {
					b._registerToolbarScope(a)
				}), n()
			},
			retrieveToolbar: function(a) {
				return g[a]
			},
			retrieveToolbarsViaEditor: function(a) {
				var b = [],
					c = this;
				return angular.forEach(this.retrieveEditor(a).toolbars, function(a) {
					b.push(c.retrieveToolbar(a))
				}), b
			},
			unregisterToolbar: function(a) {
				delete g[a];
				var b = [];
				for (var c in i) i[c].name !== a && b.push(i[c]);
				i = b, n()
			},
			updateToolsDisplay: function(a) {
				var b = this;
				angular.forEach(a, function(a, c) {
					b.updateToolDisplay(c, a)
				})
			},
			resetToolsDisplay: function() {
				var a = this;
				angular.forEach(b, function(b, c) {
					a.resetToolDisplay(c)
				}), n()
			},
			updateToolDisplay: function(a, b) {
				var c = this;
				angular.forEach(g, function(d, e) {
					c.updateToolbarToolDisplay(e, a, b)
				}), n()
			},
			resetToolDisplay: function(a) {
				var b = this;
				angular.forEach(g, function(c, d) {
					b.resetToolbarToolDisplay(d, a)
				}), n()
			},
			updateToolbarToolDisplay: function(a, b, c) {
				if (!g[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';
				g[a].updateToolDisplay(b, c)
			},
			resetToolbarToolDisplay: function(a, c) {
				if (!g[a]) throw 'textAngular Error: No Toolbar with name "' + a + '" exists';
				g[a].updateToolDisplay(c, b[c], !0)
			},
			removeTool: function(a) {
				delete b[a], angular.forEach(g, function(b) {
					delete b.tools[a];
					for (var c = 0; c < b.toolbar.length; c++) {
						for (var d, e = 0; e < b.toolbar[c].length; e++) {
							if (b.toolbar[c][e] === a) {
								d = {
									group: c,
									index: e
								};
								break
							}
							if (void 0 !== d) break
						}
						void 0 !== d && (b.toolbar[d.group].slice(d.index, 1), b._$element.children().eq(d.group).children().eq(d.index).remove())
					}
				}), n()
			},
			addTool: function(a, b, d, e) {
				c(a, b), angular.forEach(g, function(c) {
					c.addTool(a, b, d, e)
				}), n()
			},
			addToolToToolbar: function(a, b, d, e, f) {
				c(a, b), g[d].addTool(a, b, e, f), n()
			},
			refreshEditor: function(a) {
				if (!h[a]) throw 'textAngular Error: No Editor with name "' + a + '" exists';
				h[a].scope.updateTaBindtaTextElement(), h[a].scope.$$phase || h[a].scope.$digest(), n()
			},
			sendKeyCommand: function(a, b) {
				var c = h[a._name];
				return c && c.editorFunctions.sendKeyCommand(b) ? (a._bUpdateSelectedStyles || a.updateSelectedStyles(), b.preventDefault(), !1) : void 0
			},
			updateStyles: k,
			getToolbarScopes: function() {
				return i
			}
		}
	}]), r.directive("textAngularToolbar", ["$compile", "textAngularManager", "taOptions", "taTools", "taToolExecuteAction", "$window", function(a, b, c, d, e, f) {
		return {
			scope: {
				name: "@"
			},
			restrict: "EA",
			link: function(g, h, i) {
				if (!g.name || "" === g.name) throw "textAngular Error: A toolbar requires a name";
				angular.extend(g, angular.copy(c)), i.taToolbar && (g.toolbar = g.$parent.$eval(i.taToolbar)), i.taToolbarClass && (g.classes.toolbar = i.taToolbarClass), i.taToolbarGroupClass && (g.classes.toolbarGroup = i.taToolbarGroupClass), i.taToolbarButtonClass && (g.classes.toolbarButton = i.taToolbarButtonClass), i.taToolbarActiveButtonClass && (g.classes.toolbarButtonActive = i.taToolbarActiveButtonClass), i.taFocussedClass && (g.classes.focussed = i.taFocussedClass), g.disabled = !0, g.focussed = !1, g._$element = h, h[0].innerHTML = "", h.addClass("ta-toolbar " + g.classes.toolbar), g.$watch("focussed", function() {
					g.focussed ? h.addClass(g.classes.focussed) : h.removeClass(g.classes.focussed)
				});
				var j = function(b, c) {
					var d;
					if (d = b && b.display ? angular.element(b.display) : angular.element("<button type='button'>"), b && b["class"] ? d.addClass(b["class"]) : d.addClass(g.classes.toolbarButton), d.attr("name", c.name), d.attr("ta-button", "ta-button"), d.attr("ng-disabled", "isDisabled()"), d.attr("tabindex", "-1"), d.attr("ng-click", "executeAction()"), d.attr("ng-class", "displayActiveToolClass(active)"), b && b.tooltiptext && d.attr("title", b.tooltiptext), b && !b.display && !c._display && (d[0].innerHTML = "", b.buttontext && (d[0].innerHTML = b.buttontext), b.iconclass)) {
						var e = angular.element("<i>"),
							f = d[0].innerHTML;
						e.addClass(b.iconclass), d[0].innerHTML = "", d.append(e), f && "" !== f && d.append("&nbsp;" + f)
					}
					return c._lastToolDefinition = angular.copy(b), a(d)(c)
				};
				g.tools = {}, g._parent = {
					disabled: !0,
					showHtml: !1,
					queryFormatBlockState: function() {
						return !1
					},
					queryCommandState: function() {
						return !1
					}
				};
				var k = {
					$window: f,
					$editor: function() {
						return g._parent
					},
					isDisabled: function() {
						return "html" === this.name && g._parent.startAction ? !1 : "function" != typeof this.$eval("disabled") && this.$eval("disabled") || this.$eval("disabled()") || "html" !== this.name && this.$editor().showHtml || this.$parent.disabled || this.$editor().disabled
					},
					displayActiveToolClass: function(a) {
						return a ? g.classes.toolbarButtonActive : ""
					},
					executeAction: e
				};
				angular.forEach(g.toolbar, function(a) {
					var b = angular.element("<div>");
					b.addClass(g.classes.toolbarGroup), angular.forEach(a, function(a) {
						g.tools[a] = angular.extend(g.$new(!0), d[a], k, {
							name: a
						}), g.tools[a].$element = j(d[a], g.tools[a]), b.append(g.tools[a].$element)
					}), h.append(b)
				}), g.updateToolDisplay = function(a, b, c) {
					var d = g.tools[a];
					if (d) {
						if (d._lastToolDefinition && !c && (b = angular.extend({}, d._lastToolDefinition, b)), null === b.buttontext && null === b.iconclass && null === b.display) throw 'textAngular Error: Tool Definition for updating "' + a + '" does not have a valid display/iconclass/buttontext value';
						null === b.buttontext && delete b.buttontext, null === b.iconclass && delete b.iconclass, null === b.display && delete b.display;
						var e = j(b, d);
						d.$element.replaceWith(e), d.$element = e
					}
				}, g.addTool = function(a, b, c, e) {
					g.tools[a] = angular.extend(g.$new(!0), d[a], k, {
						name: a
					}), g.tools[a].$element = j(d[a], g.tools[a]);
					var f;
					void 0 === c && (c = g.toolbar.length - 1), f = angular.element(h.children()[c]), void 0 === e ? (f.append(g.tools[a].$element), g.toolbar[c][g.toolbar[c].length - 1] = a) : (f.children().eq(e).after(g.tools[a].$element), g.toolbar[c][e] = a)
				}, b.registerToolbar(g), g.$on("$destroy", function() {
					b.unregisterToolbar(g.name)
				})
			}
		}
	}]), r.name
});