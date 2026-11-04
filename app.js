(function () {
  "use strict";

  var CONFIG = window.LMG_CONFIG || {};

  // UI text. Answers are always stored in English so the team gets a consistent summary.
  var TEXT = {
    en: {
      tagline: "Automated Customer Assistance",
      footer: "Your details are shared only with the Le Marble Gallery team.",
      welcomeTitle: "Welcome to Le Marble Gallery ✨",
      welcomeBody: "We're delighted to help you find the perfect materials for your space. Please answer a few quick questions so our team can assist you better.",
      start: "Start",
      step: "Question {n} of {t}",
      next: "Continue",
      back: "Back",
      selectOne: "Select one option",
      selectAll: "Select all that apply",
      typeAnswer: "Type your answer",
      required: "Please answer this question to continue.",
      pickOne: "Please select at least one option.",
      badPhone: "Please enter a valid phone number.",
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
      step: "ചോദ്യം {n} / {t}",
      next: "തുടരുക",
      back: "പിന്നോട്ട്",
      selectOne: "ഒരെണ്ണം തിരഞ്ഞെടുക്കുക",
      selectAll: "ബാധകമായവയെല്ലാം തിരഞ്ഞെടുക്കുക",
      typeAnswer: "ഉത്തരം ടൈപ്പ് ചെയ്യുക",
      required: "തുടരാൻ ദയവായി ഈ ചോദ്യത്തിന് ഉത്തരം നൽകുക.",
      pickOne: "കുറഞ്ഞത് ഒരെണ്ണമെങ്കിലും തിരഞ്ഞെടുക്കുക.",
      badPhone: "ശരിയായ ഫോൺ നമ്പർ നൽകുക.",
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

  // Option: [stored English value, Malayalam label, optional swatch colour]
  var QUESTIONS = [
    { id: "name", type: "text", label: "Name",
      q: { en: "May we know your name?", ml: "താങ്കളുടെ പേര് എന്താണ്?" },
      autocomplete: "name" },
    { id: "language", type: "single", label: "Preferred language",
      q: { en: "Preferred Language", ml: "ഇഷ്ടപ്പെട്ട ഭാഷ" },
      options: [["English", "English"], ["Malayalam", "മലയാളം"]] },
    { id: "products", type: "multi", label: "Looking for",
      q: { en: "What are you looking for?", ml: "നിങ്ങൾ എന്താണ് അന്വേഷിക്കുന്നത്?" },
      options: [["Italian Marble", "ഇറ്റാലിയൻ മാർബിൾ"], ["Bath Fittings", "ബാത്ത് ഫിറ്റിംഗ്സ്"],
                ["Roof Tiles", "റൂഫ് ടൈലുകൾ"], ["Granite", "ഗ്രാനൈറ്റ്"]] },
    { id: "application", type: "single", label: "Application area",
      q: { en: "Application Area", ml: "ഉപയോഗിക്കുന്ന ഭാഗം" },
      options: [["Flooring", "ഫ്ലോറിംഗ്"], ["Kitchen", "കിച്ചൺ"], ["Tabletop", "ടേബിൾടോപ്പ്"]] },
    { id: "area", type: "single", label: "Approx. area (sq. ft.)",
      q: { en: "Approximate Area Required (sq. ft.)", ml: "ആവശ്യമായ ഏകദേശ വിസ്തീർണ്ണം (ചതുരശ്ര അടി)" },
      options: [["500–1,500", "500–1,500"], ["1,500–2,500", "1,500–2,500"],
                ["3,000–5,000", "3,000–5,000"], ["5,000 above", "5,000-ന് മുകളിൽ"]] },
    { id: "colour", type: "single", label: "Colour preference",
      q: { en: "Colour Preference", ml: "ഇഷ്ടപ്പെട്ട നിറം" },
      options: [["Grey", "ഗ്രേ", "#9a9893"], ["Beige", "ബീജ്", "#e3d3b8"], ["White", "വെള്ള", "#fbfaf7"]] },
    { id: "phone", type: "tel", label: "Contact number",
      q: { en: "Contact Number", ml: "ബന്ധപ്പെടാനുള്ള നമ്പർ" },
      autocomplete: "tel" },
    { id: "projectType", type: "single", label: "Project type",
      q: { en: "Project Type", ml: "പ്രോജക്റ്റ് തരം" },
      options: [["Residential", "റെസിഡൻഷ്യൽ"], ["Commercial", "കൊമേഴ്സ്യൽ"]] }
  ];

  var TOTAL = QUESTIONS.length;
  var stage = document.getElementById("stage");
  var bar = document.querySelector(".progress-bar");
  var progress = document.querySelector(".progress");

  var state = { index: -1, answers: {}, returnToReview: false };

  function lang() { return state.answers.language === "Malayalam" ? "ml" : "en"; }

  function t(key, vars) {
    var s = TEXT[lang()][key] || TEXT.en[key];
    for (var k in vars || {}) s = s.replace("{" + k + "}", vars[k]);
    return s;
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === "text") node.textContent = attrs[k];
      else if (k === "onclick") node.addEventListener("click", attrs[k]);
      else node.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function setProgress(n) {
    bar.style.width = (n / TOTAL) * 100 + "%";
    progress.setAttribute("aria-valuenow", n);
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
    setProgress(i);
    renderQuestion(QUESTIONS[i]);
  }

  function advance() {
    if (state.returnToReview) { state.returnToReview = false; return goTo(TOTAL); }
    goTo(state.index + 1);
  }

  function renderWelcome() {
    setProgress(0);
    mount(el("div", { class: "step welcome" }, [
      el("h2", { class: "question", text: TEXT.en.welcomeTitle }),
      el("p", { class: "hint", text: TEXT.en.welcomeBody }),
      el("div", { class: "actions" }, [
        el("span"),
        el("button", { class: "btn btn-primary", type: "button", text: TEXT.en.start, onclick: function () { goTo(0); } })
      ])
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
      body = input;
      nextBtn = el("button", { class: "btn btn-primary", type: "button", text: t("next"), onclick: submitText });
    } else {
      var multi = q.type === "multi";
      var selected = multi ? (state.answers[q.id] || []).slice() : state.answers[q.id];
      body = el("div", { class: "options" + (q.options.length === 2 ? " two" : ""), role: multi ? "group" : "radiogroup" });

      q.options.forEach(function (opt) {
        var value = opt[0];
        var pressed = multi ? selected.indexOf(value) !== -1 : selected === value;
        var btn = el("button", {
          class: "option" + (multi ? "" : " single"), type: "button", "aria-pressed": String(pressed)
        }, [
          el("span", { class: "tick", "aria-hidden": "true" }),
          el("span", { text: l === "ml" ? opt[1] : opt[0] }),
          opt[2] ? el("span", { class: "swatch", style: "background:" + opt[2], "aria-hidden": "true" }) : null
        ]);
        btn.addEventListener("click", function () {
          error.textContent = "";
          if (multi) {
            var at = selected.indexOf(value);
            if (at === -1) selected.push(value); else selected.splice(at, 1);
            btn.setAttribute("aria-pressed", String(at === -1));
          } else {
            state.answers[q.id] = value;
            body.querySelectorAll(".option").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
            setTimeout(advance, 180);
          }
        });
        body.appendChild(btn);
      });

      if (multi) {
        nextBtn = el("button", { class: "btn btn-primary", type: "button", text: t("next"), onclick: function () {
          if (!selected.length) { error.textContent = t("pickOne"); return; }
          // Keep the order the options are listed in
          state.answers[q.id] = q.options.map(function (o) { return o[0]; })
            .filter(function (v) { return selected.indexOf(v) !== -1; });
          advance();
        } });
      }
    }

    mount(el("div", { class: "step" }, [
      el("p", { class: "eyebrow", text: t("step", { n: state.index + 1, t: TOTAL }) }),
      hintKey ? el("h2", { class: "question", text: q.q[l] })
              : el("label", { class: "question", for: "f-" + q.id, text: q.q[l], style: "display:block" }),
      hintKey ? el("p", { class: "hint", text: t(hintKey) }) : el("div", { style: "height:16px" }),
      body,
      error,
      el("div", { class: "actions" }, [
        el("button", { class: "btn btn-ghost", type: "button", text: "← " + t("back"), onclick: function () {
          state.returnToReview = false;
          goTo(state.index - 1);
        } }),
        nextBtn || el("span")
      ])
    ]));
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
    setProgress(TOTAL);
    var list = el("ul", { class: "summary" });
    QUESTIONS.forEach(function (q, i) {
      list.appendChild(el("li", null, [
        el("span", { class: "k", text: q.q[lang()] }),
        el("span", { class: "v", text: display(state.answers[q.id]) }),
        el("button", { class: "edit", type: "button", text: t("edit"), onclick: function () {
          state.returnToReview = true;
          goTo(i);
        } })
      ]));
    });

    var hasWa = !!CONFIG.whatsappNumber;
    var submitBtn = el("button", { class: "btn btn-block " + (hasWa ? "btn-wa" : "btn-primary"), type: "button",
      text: hasWa ? t("sendWa") : t("submit") });
    submitBtn.addEventListener("click", function () { submit(submitBtn); });

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
    btn.textContent = t("sending");

    // Open WhatsApp synchronously so mobile browsers don't block it as a popup
    var wa = whatsappUrl();
    if (wa) window.open(wa, "_blank", "noopener");

    var payload = { submittedAt: new Date().toISOString() };
    QUESTIONS.forEach(function (q) { payload[q.id] = display(state.answers[q.id]); });

    var logged = CONFIG.sheetEndpoint
      ? fetch(CONFIG.sheetEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        }).catch(function () {})
      : Promise.resolve();

    logged.then(renderDone);
  }

  function renderDone() {
    var wa = whatsappUrl();
    mount(el("div", { class: "step done" }, [
      el("div", { class: "seal", "aria-hidden": "true", text: "✓" }),
      el("h2", { class: "question", text: t("doneTitle", { name: state.answers.name }) }),
      el("p", { class: "hint", text: t("doneBody") }),
      wa ? el("p", { class: "hint", text: t("doneWa") }) : null,
      el("div", { class: "stack" }, [
        wa ? el("a", { class: "btn btn-wa btn-block", href: wa, target: "_blank", rel: "noopener", text: t("sendWa"),
          style: "display:block;text-decoration:none" }) : null,
        el("button", { class: "btn btn-ghost", type: "button", text: t("restart"), onclick: function () {
          state.answers = {};
          goTo(-1);
        } })
      ])
    ]));
  }

  goTo(-1);
})();
