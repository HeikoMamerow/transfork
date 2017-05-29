/*
 * Transposh v0.9.9.1
 * http://transposh.org/
 *
 * Copyright 2016, Team Transposh
 * Licensed under the GPL Version 2 or higher.
 * http://transposh.org/license
 *
 * Date: Sun, 15 May 2016 11:33:49 +0300
 */
(function (a) {
	function e(a) {
		var b;
		return "object" === typeof t_jp.l && (b = t_jp.l[a]) ? b : a
	}

	function s(d, c, e) {
		d = d.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1");
		0 === a.trim(c).length && (c = a("[data-orig='" + d + "']").attr("data-orig"));
		var f = function () {
			var d = a(this).attr("id").substr(a(this).attr("id").lastIndexOf("_") + 1),
				c = a(b + "img_" + d);
			a(b + d).attr("data-source", e);
			c.removeClass("tr-icon-yellow").removeClass("tr-icon-green");
			0 == e ? c.addClass("tr-icon-green") : e && c.addClass("tr-icon-yellow")
		};
		a("*[data-orig='" +
			d + "'][data-hidden!='y']").html(c).each(f);
		a("*[data-orig='" + d + "'][data-hidden='y']").attr("data-trans", c).each(f);
		a(b + "translation").data("origval", c);
		a(b + "translation").keyup()
	}

	function t(b, c) {
		s(b, c, 0);
		a.ajax({
			type: "POST",
			url: t_jp.ajaxurl,
			data: {
				action: "tp_translation",
				ln0: t_jp.lang,
				sr0: 0,
				items: 1,
				tk0: b,
				tr0: c
			},
			error: function (a) {
				s(b, "", 1);
				alert("Problem saving translation, contact support.\n\nServer's message: " + a.statusText)
			}
		})
	}

	function u(d) {
		a.ajax({
			type: "GET", url: t_jp.ajaxurl, dataType: "json", data: {
				action: "tp_tp",
				e: d,
				m: "s",
				tl: t_jp.lang,
				sl: a(b + "original").data("srclang"),
				q: a(b + "original").val()
			}, success: function (d) {
				console.log(d);
				a(b + "translation").val(a("<div>" + a.trim(d.result) + "</div>").text()).keyup()
			}
		})
	}

	function D() {
		t_jp.dbt([a(b + "original").val()], function (d) {
			a(b + "translation").val(a("<div>" + a.trim(d[0].TranslatedText) + "</div>").text()).keyup()
		}, t_jp.blang)
	}

	function E() {
		t_jp.dat(a(b + "original").val(), function (d) {
				a(b + "translation").val(a("<div>" + a.trim(d.responseData.translatedText) + "</div>").text()).keyup()
			},
			t_jp.lang)
	}

	function v(b) {
		var c, e, f;
		c = a(b).dialog("widget").find(".ui-dialog-title");
		e = c.css("margin-right");
		f = c.css("margin-left");
		c.css({"float": l, "margin-right": f, "margin-left": e});
		b = a(b).dialog("widget").find(".ui-dialog-titlebar-close");
		e = b.css("right");
		f = b.css("left");
		b.css({right: f, left: e})
	}

	function F() {
		var d = b + "confirmdialog";
		a(d).remove();
		a('<div id="' + c + 'confirmdialog" title="' + e("Close without saving?") + '"><span class="ui-icon ui-icon-alert" style="float:' + l + "; margin-bottom:20px; margin-" +
			m + ':7px"></span><span style="clear:both">' + e("You have made a change to the translation. Are you sure you want to discard it?") + '<span><span id="' + c + 'dcbar" style="display:block"><button id="' + c + 'cancel">' + e("Cancel") + '</button><button id="' + c + 'discard">' + e("Discard") + "</button></span>NaN").appendTo("body").dialog({
			resizable: !1,
			modal: !0,
			minHeight: 50,
			overlay: {backgroundColor: "#000", opacity: 0.5}
		});
		a(b + "cancel").button({
			icons: {primary: "ui-icon-closethick"},
			text: !1
		}).click(function () {
			a(d).dialog("close")
		});
		a(b + "discard").button({
			icons: {primary: "ui-icon-check"},
			text: !1
		}).click(function () {
			a(b + "translation").data("changed", !1);
			a(d).dialog("close");
			a(b + "dialog").dialog("close")
		});
		a(b + "dcbar").css({"float": m}).buttonset();
		"rtl" === a("html").attr("dir") && (v(d), a(b + "dcbar button:first").addClass("ui-corner-" + l).removeClass("ui-corner-" + m), a(b + "dcbar button:last").addClass("ui-corner-" + m).removeClass("ui-corner-" + l))
	}

	function G(d) {
		var g = b + "historydialog";
		a(g).remove();
		a('<div id="' + c + 'historydialog" title="' +
			e("History") + '">' + e("Loading...") + "</div>").appendTo("body");
		a(g).css("padding", 0).dialog({width: "450px", show: "slide"});
		"rtl" === a("html").attr("dir") && v(g);
		a.ajax({
			url: t_jp.ajaxurl,
			type: "POST",
			data: {
				action: "tp_history",
				token: a(b + d).attr("data-orig"),
				lang: t_jp.lang
			},
			dataType: "json",
			cache: !1,
			success: function (q) {
				var f, k, n, p;
				a(g).empty().append('<table width="100%"><col style="width: 80%;"><col><col><thead><tr> <th>' + e("Translated") + "</th><th>" + e("By") + "</th><th>" + e("At") + "</th></tr></thead><tbody></tbody></table>");
				a.each(q, function (b, d) {
					switch (d.source) {
						case "1":
							f = "tr-icon-google";
							k = e("google");
							break;
						case "2":
							f = "tr-icon-bing";
							k = e("bing");
							break;
						case "3":
							f = "tr-icon-apertium";
							k = e("apertium");
							break;
						case "4":
							f = "tr-icon-yandex";
							k = e("yandex");
							break;
						case "5":
							f = "tr-icon-baidu";
							k = e("baidu");
							break;
						default:
							f = "ui-icon-person", k = e("manual translation")
					}
					null === d.user_login && (d.user_login = d.translated_by);
					n = '<span class="ui-button ui-widget ui-button-icon-only" style="width: 18px; border: 0px; margin-' + m + ': 3px"><span title="' +
						k + '" style="cursor: default" class="ui-button-icon-primary ui-icon ' + f + '"></span><span class="ui-button-text" style="display: inline-block; "></span></span>';
					p = d.can_delete ? '<span class="' + c + 'delete" title="' + e("delete") + '" style="width: 18px; margin-' + l + ': 3px">' : "";
					a(g + " tbody").append("<tr><td>" + d.translated + '</td><td id="' + c + 'histby">' + n + d.user_login + '</td><td id="' + c + 'histstamp">' + d.timestamp + p + "</td></tr>")
				});
				a(b + "histby," + b + "histstamp").css("white-space", "nowrap");
				a(g + " th").addClass("ui-widget-header").css("padding",
					"3px");
				a(g + " td").addClass("ui-widget-content").css("padding", "3px");
				a("." + c + "delete").button({
					icons: {primary: "ui-icon-circle-close"},
					text: !1
				}).click(function () {
					var c = a(this).parents("tr");
					a.ajax({
						url: t_jp.ajaxurl,
						type: "POST",
						data: {
							action: "tp_history",
							token: a(b + d).attr("data-orig"),
							timestamp: a(this).parents("tr").children(":last").text(),
							lang: t_jp.lang
						},
						dataType: "json",
						cache: !1,
						success: function (e) {
							!1 === e ? a(c).children().addClass("ui-state-error") : (a(c).empty(), s(a(b + d).attr("data-orig"), e.translated,
								e.source))
						}
					})
				});
				a("." + c + "delete .ui-button-text").css("display", "inline-block")
			}
		})
	}

	function w(d) {
		a(b + "original").val(a(b + d).attr("data-orig"));
		a(b + "translation").val(a(b + d).html());
		a(b + d).attr("data-trans") && a(b + "translation").val(a(b + d).attr("data-trans"));
		a(b + "translation").data("origval", a(b + "translation").val());
		a(b + "approve").button("enable");
		a(b + "prev").button("enable");
		a(b + "next").button("enable");
		a(b + (Number(d) - 1)).length || a(b + "prev").button("disable");
		a(b + (Number(d) + 1)).length || a(b + "next").button("disable");
		a(b + "oht").removeClass("ui-state-highlight");
		d = a(b + d).attr("data-srclang");
		void 0 === d && (d = t_jp.olang);
		a(b + "orglang").text(r[d]);
		a(b + "historydialog").remove();
		a(b + "translation").keyup()
	}

	function x(d) {
		var g = "", q = "", f = "", k = "", n = "", p = "", h = b + "dialog";
		t_jp.engines.b && (g = '<button class="' + c + 'suggest" id="' + c + 'bing">' + e("bing suggest") + "</button>");
		t_jp.engines.g && (q = '<button class="' + c + 'suggest" id="' + c + 'google">' + e("google suggest") + "</button>");
		t_jp.engines.a && (f = '<button class="' + c + 'suggest" id="' + c +
			'apertium">' + e("apertium suggest") + "</button>");
		t_jp.engines.y && (n = '<button class="' + c + 'suggest" id="' + c + 'yandex">' + e("yandex suggest") + "</button>");
		t_jp.engines.u && (p = '<button class="' + c + 'suggest" id="' + c + 'baidu">' + e("baidu suggest") + "</button>");
		t_jp.engines.o && (k = '<button class="' + c + 'suggest" id="' + c + 'oht">' + e("One Hour Translate queue") + "</button>");
		a(h).remove();
		a('<div id="' + c + 'dialog" title="' + e("Edit Translation") + '"/>').appendTo("body");
		a(h).css("padding", "1px").append('<div style="width: 100%"><label for="original">' +
			e("Original text") + ' (<a href="#" title="' + e("read alternate translations") + '" id="' + c + 'orglang"></a>)</label><textarea cols="80" row="3" name="original" id="' + c + 'original" readonly="y"/><span id="' + c + 'utlbar"><button id="' + c + 'prev">' + e("previous translation") + '</button><button id="' + c + 'zoom">' + e("find on page") + '</button><button id="' + c + 'next">' + e("next translation") + '</button></span><label for="translation">' + e("Translate to") + '</label><textarea cols="80" row="3" name="translation" lang="' + t_jp.lang +
			'"id="' + c + 'translation"/><span id="' + c + 'ltlbar"><button id="' + c + 'history">' + e("view translation log") + '</button><button id="' + c + 'keyboard">' + e("virtual keyboard") + "</button>" + q + g + n + p + f + k + '<button id="' + c + 'approve">' + e("approve translation") + "</button></span></div>");
		a(b + "utlbar," + b + "ltlbar").css({"float": m}).buttonset();
		a(h + " textarea").css({
			width: "483px",
			padding: ".4em",
			margin: "2px 0 0 0",
			resize: "vertical"
		}).addClass("text ui-widget-content ui-corner-all");
		a(h + " label").css({display: "block", clear: "both"});
		a(b + "orglang").click(function () {
			a(b + "langmenu").length ? a(b + "langmenu").toggle() : t_jp.tfl(function () {
				a.xLazyLoader({
					js: [t_jp.plugin_url + "/js/jquery.ui.menu.js"],
					success: function () {
						a.ajax({
							url: t_jp.ajaxurl,
							data: {
								action: "tp_trans_alts",
								token: a(b + d).attr("data-orig")
							},
							dataType: "json",
							cache: !1,
							success: function (e) {
								var f;
								(f = a(b + d).attr("data-srclang")) || (f = t_jp.olang);
								var g = '<li data-translated="' + a(b + d).attr("data-orig") + '"><a href="#">' + r[f] + "</a></li>";
								a(e).each(function (a, b) {
									b.lang !== t_jp.lang && (g = g +
										'<li data-translated="' + b.translated + '"><a href="#">' + r[b.lang] + "</a></li>")
								});
								a('<ul style="position: absolute; top: 0px" id="' + c + 'langmenu">' + g).appendTo(h);
								a(b + "langmenu").menu({
									select: function (d, c) {
										a(this).hide();
										a(b + "original").val(c.item.attr("data-translated"));
										a(b + "orglang").text(c.item.text()).addClass("ui-state-highlight");
										r[f] === c.item.text() && a(b + "orglang").removeClass("ui-state-highlight")
									}, input: a(this)
								}).show().css({
									top: 0,
									left: 0
								}).position({
									my: l + " top",
									at: l + " bottom",
									of: a(b + "orglang")
								})
							}
						})
					}
				})
			});
			return !1
		});
		a(b + "prev").button({icons: {primary: "ui-icon-seek-" + y}, text: !1});
		a(b + "zoom").button({icons: {primary: "ui-icon-search"}, text: !1});
		a(b + "next").button({icons: {primary: "ui-icon-seek-" + z}, text: !1});
		a(b + "prev").click(function () {
			if (a(b + "translation").data("changed")) {
				var c = a(b + "translation").val(),
					e = a(b + d).attr("data-orig");
				t(e, c)
			}
			d = Number(d) - 1;
			w(d)
		});
		a(b + "next").click(function () {
			if (a(b + "translation").data("changed")) {
				var c = a(b + "translation").val(),
					e = a(b + d).attr("data-orig");
				t(e, c)
			}
			d = Number(d) +
				1;
			w(d)
		});
		a(b + "zoom").click(function () {
			a("html, body").animate({scrollTop: a(b + d).offset().top}, 500);
			a(h).dialog("widget").css({
				top: a(h).dialog("widget").offset().top - window.scrollY,
				position: "fixed"
			});
			a(b + d).animate({opacity: 0.1}, "slow", function () {
				a(h).dialog("widget").css({
					top: a(h).dialog("widget").offset().top,
					position: "absolute"
				})
			}).animate({opacity: 1}, "slow").animate({opacity: 0.1}, "slow").animate({opacity: 1}, "slow").animate({opacity: 0.1}, "slow").animate({opacity: 1}, "slow")
		});
		a(b + "history").button({
			icons: {primary: "ui-icon-clipboard"},
			text: !1
		}).click(function () {
			G(d)
		});
		a(b + "keyboard").button({
			icons: {primary: "ui-icon-calculator"},
			text: !1
		}).click(function () {
			t_jp.tfl(function () {
				a.xLazyLoader({
					js: [t_jp.plugin_url + "/js/keyboard.js"],
					css: [t_jp.plugin_url + "/css/keyboard.css"],
					success: function () {
						VKI_attach(a(b + "translation").get(0));
						VKI_show(a(b + "translation").get(0))
					}
				})
			})
		});
		a(b + "google").button({
			icons: {primary: "tr-icon-google"},
			text: !1
		}).click(function () {
			u("g");
			a("." + c + "suggest").button("enable");
			a(this).button("disable")
		});
		a(b + "bing").button({
			icons: {primary: "tr-icon-bing"},
			text: !1
		}).click(function () {
			D();
			a("." + c + "suggest").button("enable");
			a(this).button("disable")
		});
		a(b + "yandex").button({
			icons: {primary: "tr-icon-yandex"},
			text: !1
		}).click(function () {
			u("y");
			a("." + c + "suggest").button("enable");
			a(this).button("disable")
		});
		a(b + "baidu").button({
			icons: {primary: "tr-icon-baidu"},
			text: !1
		}).click(function () {
			u("u");
			a("." + c + "suggest").button("enable");
			a(this).button("disable")
		});
		a(b + "apertium").button({
			icons: {primary: "tr-icon-apertium"},
			text: !1
		}).click(function () {
			E();
			a("." + c + "suggest").button("enable");
			a(this).button("disable")
		});
		a(b + "oht").button({
			icons: {primary: "tr-icon-oht"},
			text: !1
		}).click(function () {
			var c = a(this);
			a.ajax({
				url: t_jp.ajaxurl,
				data: {
					action: "tp_oht",
					q: a(b + "original").val(),
					token: a(b + d).attr("data-orig"),
					orglang: a(b + d).attr("data-srclang"),
					lang: t_jp.lang
				},
				dataType: "json",
				cache: !1,
				success: function (a) {
					a ? c.addClass("ui-state-highlight") : c.removeClass("ui-state-highlight")
				}
			})
		});
		a(b + "approve").button({
			icons: {primary: "ui-icon-check"},
			text: !1
		}).click(function () {
			var c = a(b + "translation").val(),
				e = a(b + d).attr("data-orig");
			(a(b + "translation").data("changed") || "0" !== a(b + d).attr("data-source")) && t(e, c)
		});
		a(b + "translation").keyup(function (c) {
			a(this).data("origval") !== a(this).val() ? (a(this).addClass("ui-state-highlight"), a(b + "approve").button("enable"), a(this).data("changed", !0)) : (a(this).removeClass("ui-state-highlight"), "0" === a(b + d).attr("data-source") && a(b + "approve").button("disable"), a(this).data("changed", !1))
		});
		w(d);
		a(h).dialog({resizable: !1, width: 500, zIndex: 99999});
		"rtl" === a("html").attr("dir") &&
		v(h);
		a(b + "orglang").blur();
		a(h).bind("dialogclose", function (c, d) {
			"function" === typeof VKI_close && VKI_close(a(b + "translation").get(0));
			a(b + "historydialog").remove()
		});
		a(h).keydown(function (c) {
			if (c.ctrlKey) switch (c.keyCode) {
				case A:
					a(b + "prev").click();
					break;
				case B:
					a(b + "next").click()
			}
		});
		a(h).bind("dialogbeforeclose", function (c, d) {
			return a(b + "translation").data("changed") ? (F(), !1) : !0
		})
	}

	var r = {
			en: "English - English",
			af: "Afrikaans - Afrikaans",
			sq: "Albanian - Shqip",
			ar: "Arabic - \u0627\u0644\u0639\u0631\u0628\u064a\u0629",
			hy: "Armenian - \u0540\u0561\u0575\u0565\u0580\u0565\u0576",
			az: "Azerbaijani - az\u0259rbaycan dili",
			eu: "Basque - Euskara",
			ba: "Bashkir - \u0431\u0430\u0448\u04a1\u043e\u0440\u0442 \u0442\u0435\u043b\u0435",
			be: "Belarusian - \u0411\u0435\u043b\u0430\u0440\u0443\u0441\u043a\u0430\u044f",
			bn: "Bengali - \u09ac\u09be\u0982\u09b2\u09be",
			bs: "Bosnian - bosanski jezik",
			bg: "Bulgarian - \u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438",
			ca: "Catalan - Catal\u00e0",
			yue: "Cantonese - \u7ca4\u8bed",
			ceb: "Cebuano - Binisaya",
			ny: "Chichewa - Chinyanja",
			zh: "Chinese (Simplified) - \u4e2d\u6587(\u7b80\u4f53)",
			"zh-tw": "Chinese (Traditional) - \u4e2d\u6587(\u6f22\u5b57)",
			hr: "Croatian - Hrvatski",
			cs: "Czech - \u010ce\u0161tina",
			da: "Danish - Dansk",
			nl: "Dutch - Nederlands",
			eo: "Esperanto - Esperanto",
			et: "Estonian - Eesti keel",
			fi: "Finnish - Suomi",
			fr: "French - Fran\u00e7ais",
			gl: "Galician - Galego",
			ka: "Georgian - \u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8",
			de: "German - Deutsch",
			el: "Greek - \u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",
			gu: "Gujarati - \u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0",
			ht: "Haitian - Krey\u00f2l ayisyen",
			ha: "Hausa - Harshen Hausa",
			hmn: "Hmong - Hmoob",
			mw: "Hmong Daw - Hmoob Daw",
			he: "Hebrew - \u05e2\u05d1\u05e8\u05d9\u05ea",
			hi: "Hindi - \u0939\u093f\u0928\u094d\u0926\u0940; \u0939\u093f\u0902\u0926\u0940",
			hu: "Hungarian - Magyar",
			is: "Icelandic - \u00cdslenska",
			ig: "Igbo - As\u1ee5s\u1ee5 Igbo",
			id: "Indonesian - Bahasa Indonesia",
			ga: "Irish - Gaeilge",
			it: "Italian - Italiano",
			ja: "Japanese - \u65e5\u672c\u8a9e",
			jw: "Javanese - basa Jawa",
			kn: "Kannada - \u0c95\u0ca8\u0ccd\u0ca8\u0ca1",
			kk: "Kazakh - \u049a\u0430\u0437\u0430\u049b \u0442\u0456\u043b\u0456",
			km: "Khmer - \u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c2\u179a",
			ko: "Korean - \ud55c\uad6d\uc5b4",
			ky: "Kirghiz - \u043a\u044b\u0440\u0433\u044b\u0437 \u0442\u0438\u043b\u0438",
			lo: "Lao - \u0e9e\u0eb2\u0eaa\u0eb2\u0ea5\u0eb2\u0ea7",
			la: "Latin - Lat\u012bna",
			lv: "Latvian - Latvie\u0161u valoda",
			lt: "Lithuanian - Lietuvi\u0173 kalba",
			mk: "Macedonian - \u043c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438 \u0458\u0430\u0437\u0438\u043a",
			mg: "Malagasy - Malagasy fiteny",
			ms: "Malay - Bahasa Melayu",
			ml: "Malayalam - \u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02",
			mt: "Maltese - Malti",
			mi: "Maori - Te Reo M\u0101ori",
			mr: "Marathi - \u092e\u0930\u093e\u0920\u0940",
			mn: "Mongolian - \u041c\u043e\u043d\u0433\u043e\u043b",
			my: "Burmese - \u1019\u103c\u1014\u103a\u1019\u102c\u1005\u102c",
			ne: "Nepali - \u0928\u0947\u092a\u093e\u0932\u0940",
			no: "Norwegian - Norsk",
			fa: "Persian - \u067e\u0627\u0631\u0633\u06cc",
			pl: "Polish - Polski",
			pt: "Portuguese - Portugu\u00eas",
			pa: "Punjabi - \u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40",
			ro: "Romanian - Rom\u00e2n\u0103",
			ru: "Russian - \u0420\u0443\u0441\u0441\u043a\u0438\u0439",
			sr: "Serbian - C\u0440\u043f\u0441\u043a\u0438 \u0458\u0435\u0437\u0438\u043a",
			st: "Sesotho - Sesotho",
			si: "Sinhala - \u0dc3\u0dd2\u0d82\u0dc4\u0dbd",
			sk: "Slovak - Sloven\u010dina",
			sl: "Slovene - Sloven\u0161\u010dina",
			so: "Somali - Af-Soomaali",
			es: "Spanish - Espa\u00f1ol",
			su: "Sundanese - Basa Sunda",
			sw: "Swahili - Kiswahili",
			sv: "Swedish - Svenska",
			tl: "Tagalog - Tagalog",
			tg: "Tajik - \u0422\u043e\u04b7\u0438\u043a\u04e3",
			ta: "Tamil - \u0ba4\u0bae\u0bbf\u0bb4\u0bcd",
			tt: "Tatar - \u0442\u0430\u0442\u0430\u0440\u0447\u0430",
			te: "Telugu - \u0c24\u0c46\u0c32\u0c41\u0c17\u0c41",
			th: "Thai - \u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22",
			tr: "Turkish - T\u00fcrk\u00e7e",
			uk: "Ukrainian - \u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430",
			ur: "Urdu - \u0627\u0631\u062f\u0648",
			uz: "Uzbek - O\u02bbzbek tili",
			vi: "Vietnamese - Ti\u1ebfng Vi\u1ec7t",
			cy: "Welsh - Cymraeg",
			yi: "Yiddish - \u05d9\u05d9\u05b4\u05d3\u05d9\u05e9",
			yo: "Yoruba - \u00e8d\u00e8 Yor\u00f9b\u00e1",
			zu: "Zulu - isiZulu"
		}, c = t_jp.prefix, b = "#" + c, C = !1, y = "prev", z = "next",
		m = "right", l = "left", B = 39, A = 37;
	"rtl" === a("html").attr("dir") && (m = "left", l = "right", A = 39, B = 37, y = "next", z = "prev");
	a("." + c).each(function (d) {
		if ("undefined" !== typeof a(this).attr("id")) {
			var e = a(this).attr("id").substr(a(this).attr("id").lastIndexOf("_") + 1);
			a(this).after('<span id="' + c + "img_" + e + '" class="tr-icon" title="' + a(this).attr("data-orig") + '"></span>');
			d = a(b + "img_" + e);
			var l = function () {
				t_jp.locale &&
				!C ? a.getScript(t_jp.plugin_url + "/js/l/" + t_jp.lang + ".js", function () {
					C = !0;
					x(e)
				}) : x(e)
			};
			d.click(function () {
				t_jp.tfju(function () {
					l()
				});
				return !1
			}).css({border: "0px", margin: "1px", padding: "0px"});
			"0" === a(this).attr("data-source") ? d.addClass("tr-icon-green") : a(this).attr("data-source") && d.addClass("tr-icon-yellow");
			"y" === a(this).attr("data-hidden") && d.css({opacity: "0.6"})
		}
	})
})(jQuery);
