(function () {
  "use strict";

  var CONFIG = window.LMG_CONFIG || {};

  // UI text. Answers are always stored in English so the team gets a consistent summary.
  var TEXT = {
    en: {
      tagline: "Automated Customer Assistance",
      footer: "Your details are shared only with the Le Marble Gallery team.",
      welcomeKicker: "Welcome to",
      welcomeTitle: "Le Marble Gallery ✨",
      welcomeBody: "We're delighted to help you find the perfect materials for your space. Please answer a few quick questions so our team can assist you better.",
      perks: ["8 quick questions", "Under 2 minutes", "English · മലയാളം"],
      start: "Start my enquiry",
      of: "of",
      next: "Continue",
      back: "Back",
      selectOne: "Select one option",
      selectAll: "Select all that apply",
      typeAnswer: "Type your answer",
      required: "Please answer this question to continue.",
      pickOne: "Please select at least one option.",
      badPhone: "Please enter a valid phone number.",
      pickColour: "Tap to pick a colour",
      colourName: "Colour name (optional), e.g. Black, Emerald green",
      reviewTitle: "Your enquiry summary",
      reviewHint: "Please check your details before sending.",
      edit: "Edit",
      sendWa: "Send via WhatsApp",
      submit: "Submit enquiry",
      copy: "Copy enquiry summary",
      copied: "Summary copied",
      sending: "Sending…",
      doneTitle: "Thank you, {name}!",
      doneBody: "Our team has your enquiry and will contact you shortly.",
      doneWa: "If WhatsApp didn't open, tap below to send your enquiry.",
      restart: "Start a new enquiry"
    },
    ml: {
      tagline: "ഓട്ടോമേറ്റഡ് കസ്റ്റമർ അസിസ്റ്റൻസ്",
      footer: "നിങ്ങളുടെ വിവരങ്ങൾ Le Marble Gallery ടീമുമായി മാത്രമേ പങ്കിടുകയുള്ളൂ.",
      of: "/",
      next: "തുടരുക",
      back: "പിന്നോട്ട്",
      selectOne: "ഒരെണ്ണം തിരഞ്ഞെടുക്കുക",
      selectAll: "ബാധകമായവയെല്ലാം തിരഞ്ഞെടുക്കുക",
      typeAnswer: "ഉത്തരം ടൈപ്പ് ചെയ്യുക",
      required: "തുടരാൻ ദയവായി ഈ ചോദ്യത്തിന് ഉത്തരം നൽകുക.",
      pickOne: "കുറഞ്ഞത് ഒരെണ്ണമെങ്കിലും തിരഞ്ഞെടുക്കുക.",
      badPhone: "ശരിയായ ഫോൺ നമ്പർ നൽകുക.",
      pickColour: "നിറം തിരഞ്ഞെടുക്കാൻ ടാപ്പ് ചെയ്യുക",
      colourName: "നിറത്തിന്റെ പേര് (ഓപ്ഷണൽ), ഉദാ. കറുപ്പ്, പച്ച",
      reviewTitle: "നിങ്ങളുടെ അന്വേഷണ സംഗ്രഹം",
      reviewHint: "അയക്കുന്നതിന് മുൻപ് വിവരങ്ങൾ പരിശോധിക്കുക.",
      edit: "മാറ്റുക",
      sendWa: "WhatsApp വഴി അയക്കുക",
      submit: "അന്വേഷണം സമർപ്പിക്കുക",
      copy: "സംഗ്രഹം കോപ്പി ചെയ്യുക",
      copied: "സംഗ്രഹം കോപ്പി ചെയ്തു",
      sending: "അയക്കുന്നു…",
      doneTitle: "നന്ദി, {name}!",
      doneBody: "ഞങ്ങളുടെ ടീം ഉടൻ തന്നെ നിങ്ങളെ ബന്ധപ്പെടും.",
      doneWa: "WhatsApp തുറന്നില്ലെങ്കിൽ, താഴെ ടാപ്പ് ചെയ്ത് അന്വേഷണം അയക്കുക.",
      restart: "പുതിയ അന്വേഷണം തുടങ്ങുക"
    }
  };

  // Option: [stored English value, Malayalam label, optional swatch colour, optional "custom"]
  // layout: how the options are drawn — "tiles" (icon cards), "scale" (rows with a size meter), "swatches" (colour cards)
  var QUESTIONS = [
    { id: "name", type: "text", label: "Name",
      q: { en: "May we know your name?", ml: "താങ്കളുടെ പേര് എന്താണ്?" },
      autocomplete: "name" },
    { id: "language", type: "single", label: "Preferred language", layout: "tiles",
      q: { en: "Preferred Language", ml: "ഇഷ്ടപ്പെട്ട ഭാഷ" },
      options: [["English", "English"], ["Malayalam", "മലയാളം"]] },
    { id: "products", type: "multi", label: "Looking for", layout: "tiles",
      q: { en: "What are you looking for?", ml: "നിങ്ങൾ എന്താണ് അന്വേഷിക്കുന്നത്?" },
      options: [["Italian Marble", "ഇറ്റാലിയൻ മാർബിൾ"], ["Bath Fittings", "ബാത്ത് ഫിറ്റിംഗ്സ്"],
                ["Roof Tiles", "റൂഫ് ടൈലുകൾ"], ["Granite", "ഗ്രാനൈറ്റ്"]] },
    { id: "application", type: "single", label: "Application area", layout: "tiles three",
      q: { en: "Application Area", ml: "ഉപയോഗിക്കുന്ന ഭാഗം" },
      options: [["Flooring", "ഫ്ലോറിംഗ്"], ["Kitchen", "കിച്ചൺ"], ["Tabletop", "ടേബിൾടോപ്പ്"]] },
    { id: "area", type: "single", label: "Approx. area (sq. ft.)", layout: "scale",
      q: { en: "Approximate Area Required (sq. ft.)", ml: "ആവശ്യമായ ഏകദേശ വിസ്തീർണ്ണം (ചതുരശ്ര അടി)" },
      options: [["500–1,500", "500–1,500"], ["1,500–2,500", "1,500–2,500"],
                ["3,000–5,000", "3,000–5,000"], ["5,000 above", "5,000-ന് മുകളിൽ"]] },
    { id: "colour", type: "single", label: "Colour preference", layout: "swatches",
      q: { en: "Colour Preference", ml: "ഇഷ്ടപ്പെട്ട നിറം" },
      options: [["Grey", "ഗ്രേ", "#a3a19c"], ["Beige", "ബീജ്", "#e3d3b8"], ["White", "വെള്ള", "#fbfaf7"],
                ["Choose a colour", "മറ്റൊരു നിറം തിരഞ്ഞെടുക്കുക",
                 "conic-gradient(from 200deg, #d94f4f, #e3b04b, #6bbf6b, #4b8fe3, #a35fd6, #d94f4f)", "custom"]] },
    { id: "phone", type: "tel", label: "Contact number",
      q: { en: "Contact Number", ml: "ബന്ധപ്പെടാനുള്ള നമ്പർ" },
      autocomplete: "tel" },
    { id: "projectType", type: "single", label: "Project type", layout: "tiles",
      q: { en: "Project Type", ml: "പ്രോജക്റ്റ് തരം" },
      options: [["Residential", "റെസിഡൻഷ്യൽ"], ["Commercial", "കൊമേഴ്സ്യൽ"]] }
  ];

  // Line icons (24×24, stroked) for option tiles, keyed by the stored English value.
  var ICONS = {
    "Italian Marble": '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 14c4-1 6-5 9-6s5 1 9-2M9 20c1-3 3-4 6-5"/>',
    "Bath Fittings": '<path d="M4 9h8a3 3 0 0 1 3 3v1.5M4 6v6M2.5 6h3M14 17v.01M12.5 19.5v.01M15.5 20v.01M15 12h4a1 1 0 0 0 1-1V8"/>',
    "Roof Tiles": '<path d="M3 11 12 4l9 7"/><path d="M5 14c1.2 1 2.8 1 4 0 1.2 1 2.8 1 4 0 1.2 1 2.8 1 4 0 .7.6 1.4.8 2 .8M5 18.5c1.2 1 2.8 1 4 0 1.2 1 2.8 1 4 0 1.2 1 2.8 1 4 0 .7.6 1.4.8 2 .8"/>',
    "Granite": '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="1"/><circle cx="15.5" cy="7" r=".6"/><circle cx="12" cy="12" r="1.3"/><circle cx="7" cy="15.5" r=".7"/><circle cx="16.5" cy="15" r="1"/><circle cx="11" cy="18" r=".6"/>',
    "Flooring": '<path d="M2 20 7 8h10l5 12z"/><path d="M12 8v12M4.3 14.5h15.4M9.5 8 7.5 20M14.5 8l2 12"/>',
    "Kitchen": '<path d="M2 11h20"/><rect x="4" y="11" width="16" height="9" rx="1"/><path d="M12 11v9M9 15h1M14 15h1"/><circle cx="8" cy="7" r="2"/><circle cx="16" cy="7" r="2"/>',
    "Tabletop": '<rect x="3" y="7" width="18" height="3" rx="1"/><path d="M5 10v10M19 10v10M8 10v4h8v-4"/>',
    "Residential": '<path d="M3 11 12 4l9 7"/><path d="M5 9.5V20h14V9.5M10 20v-5h4v5"/>',
    "Commercial": '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M11 21v-3h2v3"/>'
  };
  var GLYPHS = { "English": "Aa", "Malayalam": "അ" };
  var ARROW = '<path d="M5 12h14M13 6l6 6-6 6"/>';
  var BACK = '<path d="M19 12H5M11 6l-6 6 6 6"/>';
  var PERSON = '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>';
  var PHONE = '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>';

  function svg(paths) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + paths + "</svg>";
  }

  var TOTAL = QUESTIONS.length;
  var stage = document.getElementById("stage");
  var progress = document.querySelector(".progress");
  var segments = QUESTIONS.map(function () {
    var seg = document.createElement("span");
    progress.appendChild(seg);
    return seg;
  });

  var state = { index: -1, answers: {}, returnToReview: false, custom: { hex: "#8b6f4e", name: "" } };

  function lang() { return state.answers.language === "Malayalam" ? "ml" : "en"; }

  function t(key, vars) {
    var s = TEXT[lang()][key] || TEXT.en[key];
    for (var k in vars || {}) s = s.replace("{" + k + "}", vars[k]);
    return s;
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    for (var k in attrs || {}) {
      if (attrs[k] == null) continue;
      if (k === "text") node.textContent = attrs[k];
      else if (k === "html") node.innerHTML = attrs[k];
      else if (k === "onclick") node.addEventListener("click", attrs[k]);
      else node.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  // Button with a label and an optional leading/trailing icon
  function button(cls, label, onclick, icon, iconFirst) {
    var html = "<span>" + label.replace(/</g, "&lt;") + "</span>";
    if (icon) html = iconFirst ? svg(icon) + html : html + svg(icon);
    return el("button", { class: "btn " + cls, type: "button", html: html, onclick: onclick });
  }

  function setProgress(done, current) {
    segments.forEach(function (s, i) {
      s.className = i < done ? "on" : i === current ? "now" : "";
    });
    progress.setAttribute("aria-valuenow", done);
  }

  function applyLanguage() {
    document.body.classList.toggle("ml", lang() === "ml");
    document.documentElement.lang = lang() === "ml" ? "ml" : "en";
    document.querySelectorAll("[data-i18n]").forEach(function (n) {
      n.textContent = t(n.getAttribute("data-i18n"));
    });
  }

  function mount(node) {
    stage.innerHTML = "";
    stage.appendChild(node);
    var focusable = node.querySelector("input, .btn-primary");
    if (focusable && window.matchMedia("(min-width: 600px)").matches) focusable.focus();
  }

  function goTo(i) {
    state.index = i;
    applyLanguage();
    if (i < 0) return renderWelcome();
    if (i >= TOTAL) return renderReview();
    setProgress(i, i);
    renderQuestion(QUESTIONS[i]);
  }

  function advance() {
    if (state.returnToReview) { state.returnToReview = false; return goTo(TOTAL); }
    goTo(state.index + 1);
  }

  function renderWelcome() {
    setProgress(0, -1);
    var perks = el("ul", { class: "perks" });
    TEXT.en.perks.forEach(function (p) { perks.appendChild(el("li", { text: p })); });
    mount(el("div", { class: "step welcome" }, [
      el("p", { class: "kicker", text: TEXT.en.welcomeKicker }),
      el("h2", { class: "question", text: TEXT.en.welcomeTitle }),
      el("p", { class: "hint", text: TEXT.en.welcomeBody }),
      perks,
      button("btn-primary btn-block btn-lg", TEXT.en.start, function () { goTo(0); }, ARROW)
    ]));
  }

  function renderQuestion(q) {
    var l = lang();
    var error = el("p", { class: "error", role: "alert" });
    var body, nextBtn;
    var hintKey = q.type === "multi" ? "selectAll" : q.type === "single" ? "selectOne" : null;

    if (q.type === "text" || q.type === "tel") {
      var input = el("input", {
        class: "field", type: q.type, id: "f-" + q.id, name: q.id,
        placeholder: t("typeAnswer"), autocomplete: q.autocomplete,
        inputmode: q.type === "tel" ? "tel" : "text"
      });
      input.value = state.answers[q.id] || "";
      var submitText = function () {
        var v = input.value.trim();
        if (!v) { error.textContent = t("required"); return; }
        if (q.type === "tel" && !/^\+?[\d\s-]{7,16}$/.test(v)) { error.textContent = t("badPhone"); return; }
        state.answers[q.id] = v;
        advance();
      };
      input.addEventListener("keydown", function (e) { if (e.key === "Enter") submitText(); });
      input.addEventListener("input", function () { error.textContent = ""; });
      body = el("div", { class: "field-wrap" }, [
        el("span", { class: "field-icon", html: svg(q.type === "tel" ? PHONE : PERSON) }),
        input
      ]);
      nextBtn = button("btn-primary", t("next"), submitText, ARROW);
    } else {
      var multi = q.type === "multi";
      var selected = multi ? (state.answers[q.id] || []).slice() : state.answers[q.id];
      body = el("div", { class: "options " + (q.layout || "list"), role: multi ? "group" : "radiogroup" });

      var customPanel = null;
      var customValue = function () {
        var name = state.custom.name.trim();
        return "Custom: " + (name ? name + " " : "") + "(" + state.custom.hex.toUpperCase() + ")";
      };

      q.options.forEach(function (opt, oi) {
        var value = opt[0];
        var isCustom = opt[3] === "custom";
        var pressed = multi ? selected.indexOf(value) !== -1
          : isCustom ? /^Custom/.test(selected || "") : selected === value;
        var scale = q.layout === "scale";
        var btn = el("button", {
          class: "option" + (multi ? "" : " single"), type: "button", "aria-pressed": String(pressed)
        }, [
          opt[2] ? el("span", { class: "swatch" + (isCustom ? " rainbow" : ""), style: "background:" + opt[2], "aria-hidden": "true" }) : null,
          ICONS[value] ? el("span", { class: "art", html: svg(ICONS[value]) }) : null,
          GLYPHS[value] ? el("span", { class: "art glyph", "aria-hidden": "true", text: GLYPHS[value] }) : null,
          scale ? el("span", { class: "meter", "aria-hidden": "true",
            html: [0, 1, 2, 3].map(function (b) { return "<i" + (b <= oi ? ' class="f"' : "") + "></i>"; }).join("") }) : null,
          el("span", { class: "label", text: l === "ml" ? opt[1] : opt[0] }),
          scale ? el("span", { class: "unit", text: "sq. ft." }) : null,
          el("span", { class: "tick", "aria-hidden": "true" })
        ]);
        if (isCustom) {
          customPanel = buildCustomPanel(pressed, function () {
            state.answers[q.id] = customValue();
            advance();
          });
        }
        btn.addEventListener("click", function () {
          error.textContent = "";
          if (isCustom) {
            body.querySelectorAll(".option").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
            customPanel.hidden = false;
            customPanel.querySelector("input[type=color]").focus();
          } else if (multi) {
            var at = selected.indexOf(value);
            if (at === -1) selected.push(value); else selected.splice(at, 1);
            btn.setAttribute("aria-pressed", String(at === -1));
          } else {
            state.answers[q.id] = value;
            if (customPanel) customPanel.hidden = true;
            body.querySelectorAll(".option").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
            setTimeout(advance, 220);
          }
        });
        body.appendChild(btn);
      });
      if (customPanel) body.appendChild(customPanel);

      if (multi) {
        nextBtn = button("btn-primary", t("next"), function () {
          if (!selected.length) { error.textContent = t("pickOne"); return; }
          // Keep the order the options are listed in
          state.answers[q.id] = q.options.map(function (o) { return o[0]; })
            .filter(function (v) { return selected.indexOf(v) !== -1; });
          advance();
        }, ARROW);
      }
    }

    mount(el("div", { class: "step" }, [
      el("p", { class: "eyebrow" }, [
        el("span", { class: "num", text: pad(state.index + 1) }),
        el("span", { class: "of", text: t("of") + " " + pad(TOTAL) })
      ]),
      hintKey ? el("h2", { class: "question", text: q.q[l] })
              : el("label", { class: "question", for: "f-" + q.id, text: q.q[l] }),
      hintKey ? el("p", { class: "hint", text: t(hintKey) }) : el("div", { class: "spacer" }),
      body,
      error,
      el("div", { class: "actions" }, [
        button("btn-ghost", t("back"), function () {
          state.returnToReview = false;
          goTo(state.index - 1);
        }, BACK, true),
        nextBtn || el("span")
      ])
    ]));
  }

  function buildCustomPanel(open, onDone) {
    var picker = el("input", { type: "color", id: "f-custom-colour", "aria-label": t("pickColour") });
    picker.value = state.custom.hex;
    var hex = el("span", { class: "hex", text: state.custom.hex.toUpperCase() });
    picker.addEventListener("input", function () {
      state.custom.hex = picker.value;
      hex.textContent = picker.value.toUpperCase();
    });

    var name = el("input", { class: "field", type: "text", placeholder: t("colourName"), "aria-label": t("colourName") });
    name.value = state.custom.name;
    name.addEventListener("input", function () { state.custom.name = name.value; });
    name.addEventListener("keydown", function (e) { if (e.key === "Enter") onDone(); });

    var panel = el("div", { class: "custom-panel" }, [
      el("label", { class: "picker", for: "f-custom-colour" }, [
        picker,
        el("span", null, [el("span", { class: "picker-label", text: t("pickColour") }), hex])
      ]),
      name,
      button("btn-primary", t("next"), onDone, ARROW)
    ]);
    panel.hidden = !open;
    return panel;
  }

  function display(v) { return Array.isArray(v) ? v.join(", ") : v; }

  function summaryText() {
    var lines = ["*New Enquiry – Le Marble Gallery*", ""];
    QUESTIONS.forEach(function (q) { lines.push(q.label + ": " + display(state.answers[q.id])); });
    return lines.join("\n");
  }

  function whatsappUrl() {
    if (!CONFIG.whatsappNumber) return null;
    return "https://wa.me/" + CONFIG.whatsappNumber.replace(/\D/g, "") + "?text=" + encodeURIComponent(summaryText());
  }

  function copySummary() {
    var text = summaryText();
    var done = function () { toast(t("copied")); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done);
    } else {
      var ta = el("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      done();
    }
  }

  function toast(msg) {
    var n = el("div", { class: "toast", role: "status", text: msg });
    document.body.appendChild(n);
    setTimeout(function () { n.remove(); }, 1800);
  }

  function renderReview() {
    setProgress(TOTAL, -1);
    var list = el("ul", { class: "summary" });
    QUESTIONS.forEach(function (q, i) {
      list.appendChild(el("li", null, [
        el("span", { class: "idx", "aria-hidden": "true", text: pad(i + 1) }),
        el("span", { class: "k", text: q.q[lang()] }),
        el("span", { class: "v", text: display(state.answers[q.id]) }),
        el("button", { class: "edit", type: "button", text: t("edit"), onclick: function () {
          state.returnToReview = true;
          goTo(i);
        } })
      ]));
    });

    var hasWa = !!CONFIG.whatsappNumber;
    var submitBtn = button("btn-block btn-lg " + (hasWa ? "btn-wa" : "btn-primary"), hasWa ? t("sendWa") : t("submit"),
      function () { submit(submitBtn); }, ARROW);

    mount(el("div", { class: "step" }, [
      el("h2", { class: "question", text: t("reviewTitle") }),
      el("p", { class: "hint", text: t("reviewHint") }),
      list,
      el("div", { class: "stack" }, [
        submitBtn,
        el("button", { class: "btn btn-outline btn-block", type: "button", text: t("copy"), onclick: copySummary })
      ])
    ]));
  }

  function submit(btn) {
    btn.disabled = true;
    btn.classList.add("is-busy");
    btn.textContent = t("sending");

    // Open WhatsApp synchronously so mobile browsers don't block it as a popup
    var wa = whatsappUrl();
    if (wa) window.open(wa, "_blank", "noopener");

    // Form-encoded keeps this a "simple" request (no CORS preflight); Make parses each field.
    var payload = new URLSearchParams({ submittedAt: new Date().toISOString() });
    QUESTIONS.forEach(function (q) { payload.append(q.id, display(state.answers[q.id])); });
    payload.append("summary", summaryText());

    var sent = CONFIG.webhookUrl
      ? fetch(CONFIG.webhookUrl, { method: "POST", mode: "no-cors", body: payload, keepalive: true })
          .catch(function () {})
      : Promise.resolve();

    sent.then(renderDone);
  }

  function renderDone() {
    var wa = whatsappUrl();
    mount(el("div", { class: "step done" }, [
      el("div", { class: "seal", "aria-hidden": "true",
        html: '<svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27l7 7 15-16"/></svg>' }),
      el("h2", { class: "question", text: t("doneTitle", { name: state.answers.name }) }),
      el("p", { class: "hint", text: t("doneBody") }),
      wa ? el("p", { class: "hint", text: t("doneWa") }) : null,
      el("div", { class: "stack" }, [
        wa ? el("a", { class: "btn btn-wa btn-block", href: wa, target: "_blank", rel: "noopener", text: t("sendWa") }) : null,
        el("button", { class: "btn btn-ghost", type: "button", text: t("restart"), onclick: function () {
          state.answers = {};
          state.custom = { hex: "#8b6f4e", name: "" };
          goTo(-1);
        } })
      ])
    ]));
  }

  goTo(-1);
})();
