/* ── Tab Navigation ── */

document.querySelectorAll('.nav a[data-tab]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    var tab = this.getAttribute('data-tab');

    document.querySelectorAll('.nav a[data-tab]').forEach(function(l) {
      l.classList.remove('active-tab');
    });
    this.classList.add('active-tab');

    document.querySelectorAll('.tab-panel').forEach(function(p) {
      p.classList.remove('active');
    });
    document.querySelectorAll('.tab-panel-sidebar').forEach(function(p) {
      p.classList.remove('active');
    });

    var panel = document.getElementById('panel-' + tab);
    var sidebar = document.getElementById('sidebar-' + tab);
    if (panel) panel.classList.add('active');
    if (sidebar) sidebar.classList.add('active');

    document.querySelector('.container').scrollIntoView({ behavior: 'smooth', block: 'start' });

    var nav = document.getElementById('mainNav');
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      document.getElementById('navToggle').classList.remove('open');
    }
  });
});

document.getElementById('navToggle').addEventListener('click', function() {
  document.getElementById('mainNav').classList.toggle('open');
  this.classList.toggle('open');
});

/* ── Modal System ── */

var modals = {
  myfog: {
    title: '🌫️ myFog Dashboard',
    body: '<p><strong>Welcome back, Otter.</strong></p>' +
      '<p>Your myFog dashboard has been loading since 2019. Please wait.</p>' +
      '<div class="modal-progress"><div class="modal-progress-fill" style="width: 34%;"></div></div>' +
      '<p><strong>📊 Your Stats:</strong><br>' +
      '• Days since you last saw the sun: 47<br>' +
      '• Times lost in Lot B: 12<br>' +
      '• Otter statue nose rubs this semester: 3<br>' +
      '• Unread Title IX investigation emails: 847<br>' +
      '• Current mood: Damp</p>'
  },
  ottercam: {
    title: '📹 Otter Cam',
    body: '<p><strong>🔍 Searching for otters...</strong></p>' +
      '<p>This may take a while. They\'re small. And fast. ' +
      'And probably hiding somewhere in the fog.</p>' +
      '<div class="modal-progress"><div class="modal-progress-fill" style="width: 18%;"></div></div>' +
      '<p>Estimated time remaining: <strong>2–4 business days</strong></p>' +
      '<p style="font-size: 11px; color: #999;">Last confirmed otter sighting: March 2024. ' +
      'We\'re pretty sure that was a rock.</p>'
  },
  rubnose: {
    title: '🦦 Nose Rubbing Service',
    body: '<p><strong>🧹 Rubbing the bronze otter\'s nose...</strong></p>' +
      '<div class="modal-progress"><div class="modal-progress-fill" style="width: 63%;"></div></div>' +
      '<p>✅ Your exam scores have increased by <strong>0.04%</strong>.</p>' +
      '<p>Rub again for additional gains. (Results may vary. ' +
      'The statue is not responsible for failed exams. The statue is, technically, inanimate.)</p>',
    buttons: [
      { text: '🦦 Rub Again!', class: 'modal-btn-alt', action: 'rubnose_effect' },
      { text: 'Done', class: 'modal-btn modal-btn-close', action: 'close' }
    ]
  },
  diningmenu: {
    title: '🥘 The Eatery — Today\'s Menu',
    body: '<p><strong>Welcome to the Eatery, home of 8 concepts.</strong></p>' +
      '<p>Today\'s featured items:</p>' +
      '<p>• Creamy Chicken Thing<br>' +
      '• Beef Situation<br>' +
      '• Soup (Color: Grey)<br>' +
      '• Pasta Mood<br>' +
      '• Vegetable Adjacent Stir-Fry<br>' +
      '• Protein of Unknown Origin</p>' +
      '<p><em>Ramen Bar is currently closed. It\'s always closed. ' +
      'We\'ve accepted this.</em></p>' +
      '<p style="text-align: right; font-size: 12px; color: #888;">Bon appétit! 🦦</p>'
  },
  parkinggrief: {
    title: '🅿️ Parking Grief Support Group',
    body: '<p><strong>Welcome. You are in a safe space.</strong></p>' +
      '<p>Your feelings about Lot B are valid. Your $588 parking permit ' +
      'was not a purchase — it was an <em>emotional investment</em>.</p>' +
      '<p><strong>Today\'s exercise:</strong><br>' +
      '1. Breathe in (the smell of fog)<br>' +
      '2. Breathe out (acceptance)<br>' +
      '3. Repeat: <em>"I am not my parking permit price"</em></p>' +
      '<p style="font-size: 11px; color: #888;">Next session: When you next circle Lot B for 20 minutes 🙏</p>',
    buttons: [
      { text: '🙏 I Feel Seen', class: 'modal-btn modal-btn-close', action: 'close' }
    ]
  },
  titleix: {
    title: '⏳ Title IX Investigation Tracker',
    body: '<p><strong>Your case: #847 in queue</strong></p>' +
      '<div class="modal-progress"><div class="modal-progress-fill" style="width: 7%;"></div></div>' +
      '<p>Current status: <strong>7% complete</strong></p>' +
      '<p>Estimated completion: Q4 2028 (optimistic)<br>' +
      'Actual completion: <em>TBD</em> (realistic)</p>' +
      '<p style="font-size: 12px; color: #666;">"Your case is important to us. Please hold."</p>'
  },
  privacypolicy: {
    title: '📄 Privacy Policy (Parody Edition)',
    body: '<p><strong>What we collect:</strong><br>' +
      '• Your location (via the fog)<br>' +
      '• Your parking frustration levels<br>' +
      '• Your otter-related search history<br>' +
      '• Your feelings about 8 concepts</p>' +
      '<p><strong>What we share:</strong><br>' +
      '• Your data with no one (who would want it?)<br>' +
      '• Your parking woes with the entire Lot B community</p>' +
      '<p>By using this site, you consent to being gently roasted. ' +
      'You also consent to not seeing the sun for extended periods.</p>' +
      '<p style="font-size: 11px; color: #888;">Last updated: When we remembered this page existed</p>'
  },
  complaint: {
    title: '📝 Complaint Submission System',
    body: '<p><strong>✅ Your complaint has been submitted!</strong></p>' +
      '<p>Queue position: <strong>847</strong><br>' +
      'Estimated processing time: <strong>2–4 business years</strong></p>' +
      '<p>We appreciate your patience. Your frustration has been noted ' +
      'and added to our "frustration backlog," which we\'re currently ' +
      'using as kindling for the Ghost Kitchen.</p>' +
      '<p style="font-size: 11px; color: #888;">Check back never! 🦦</p>'
  }
};

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

function showModal(key) {
  var data = modals[key];
  if (!data) return;

  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalBody').innerHTML = data.body;

  var footer = document.getElementById('modalFooter');
  footer.innerHTML = '';

  if (data.buttons) {
    data.buttons.forEach(function(btn) {
      var el = document.createElement('button');
      el.textContent = btn.text;
      el.className = btn.class || 'modal-btn modal-btn-close';
      el.addEventListener('click', function() {
        if (btn.action === 'close') {
          closeModal();
        } else if (btn.action === 'rubnose_effect') {
          closeModal();
          var fx = effects['rubnose'];
          if (fx) triggerEffect(fx);
        } else if (btn.action && modals[btn.action]) {
          showModal(btn.action);
        }
      });
      footer.appendChild(el);
    });
  } else {
    var ok = document.createElement('button');
    ok.textContent = 'OK';
    ok.className = 'modal-btn modal-btn-close';
    ok.addEventListener('click', closeModal);
    footer.appendChild(ok);
  }

  document.getElementById('modalOverlay').classList.add('open');
}

document.querySelectorAll('[data-modal]').forEach(function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    showModal(this.getAttribute('data-modal'));
  });
});

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

/* ── Custom Effects System ── */

var rubCount = 0;

var effects = {
  rubnose: {
    emojis: ['🦦', '✨', '🌟', '💫', '⭐', '🏅', '🎉'],
    colors: ['#c9a84c', '#dbbf5e', '#e8d48b', '#ffffff', '#689466'],
    flash: 'rgba(201,168,76,0.15)',
    counter: true,
    makeToast: function() {
      var pct = (Math.random() * 14.99 + 0.01).toFixed(2);
      var msgs = [
        "Your exam scores increased by {pct}%.",
        "The bronze otter grants you {pct}% more wisdom.",
        "You feel a warm sense of academic validation. ({pct}% increase)",
        "Ancient otter magic swirls around you. Grades +{pct}%.",
        "Your degree is now {pct}% more valuable. You're welcome.",
        "Parking tickets will now miss you {pct}% of the time."
      ];
      var msg = msgs[Math.floor(Math.random() * msgs.length)].replace('{pct}', pct);
      return { html: '<span class="pct">+' + pct + '%</span>' + msg };
    }
  },
  myfog: {
    emojis: ['📊', '💻', '📈', '📉', '🔄', '🗄️'],
    colors: ['#31456b', '#4a6380', '#6b92b6', '#1a2640'],
    flash: 'rgba(49,69,107,0.12)',
    particleClass: 'particle-grid',
    makeToast: function() {
      var msgs = [
        "📊 Dashboard syncing... Established 1994. Still loading.",
        "💻 Welcome to myFog. Your dashboard was last updated: 2019.",
        "📈 Your stats: Days without sun: 47. Parking tickets: $588/yr. Mood: Damp.",
        "🔄 myFog is loading. Please wait. We've been saying that since 2019."
      ];
      return { text: msgs[Math.floor(Math.random() * msgs.length)] };
    }
  },
  ottercam: {
    emojis: ['🔍', '📹', '👀', '🔎', '👁️', '🌫️'],
    colors: ['#17a2b8', '#138496', '#0c7a8a', '#1a7a8a'],
    flash: 'rgba(23,162,184,0.12)',
    makeToast: function() {
      var msgs = [
        "🔍 No otters detected. Try adjusting your expectations.",
        "📹 Camera feed: 100% fog. Otters: 0%. Disappointment: infinite.",
        "👀 OtterCam™ has been searching since 2023. We've accepted this.",
        "🌫️ Visibility: 2 otters. Actual otters seen: 0. The fog is winning."
      ];
      return { text: msgs[Math.floor(Math.random() * msgs.length)] };
    }
  },
  diningmenu: {
    emojis: ['🍜', '🌮', '🍔', '🥗', '🍝', '🥟', '🍕', '🧋'],
    colors: ['#c9a84c', '#dbbf5e', '#e8d48b', '#b89a3a', '#689466'],
    flash: 'rgba(201,168,76,0.12)',
    makeToast: function() {
      var items = ['Creamy Chicken Thing', 'Beef Situation', 'Pasta Mood', 'Soup (Color Varies)', 'Vegetable Adjacent Stir-Fry', 'Protein of Unknown Origin'];
      var item = items[Math.floor(Math.random() * items.length)];
      var msgs = [
        "🥘 Today's feature: \"" + item + "\" — the Ramen Bar is still closed.",
        "🍜 8 concepts. 1 kitchen. Infinite disappointment. Today: " + item + ".",
        "🍔 The Eatery says " + item + ". You didn't ask. They didn't care.",
        "🥗 Menu posted. It says " + item + ". Nobody knows what it means."
      ];
      return { text: msgs[Math.floor(Math.random() * msgs.length)] };
    }
  },
  parkinggrief: {
    emojis: ['🅿️', '🚗', '😌', '🧘', '🚲', '🚌'],
    colors: ['#689466', '#4f7a4e', '#7aaa78', '#5a8d58', '#3d6b3c'],
    flash: 'rgba(104,148,102,0.12)',
    makeToast: function() {
      var msgs = [
        "🅿️ Breathe in. Breathe out. You are not your $588 parking permit.",
        "🧘 Lot B is a journey, not a destination. (It's also a 20-minute walk.)",
        "🚲 Free bike from the Otter Cycle Center. Or acceptance. Either works.",
        "😌 You've reached stage 5: Acceptance. Your parking grief is valid."
      ];
      return { text: msgs[Math.floor(Math.random() * msgs.length)] };
    }
  },
  privacypolicy: {
    emojis: ['📄', '🔏', '📝', '⚖️', '📋', '🔐'],
    colors: ['#8dabcf', '#b8cce0', '#9ab0cc', '#7a99bb'],
    flash: 'rgba(141,171,207,0.1)',
    makeToast: function() {
      var msgs = [
        "📄 By using this site, you consent to being gently roasted.",
        "🔏 We collect: your location (via fog), your parking frustration, your otter search history.",
        "⚖️ Privacy policy updated. Changes: we added more jokes. You're welcome.",
        "📋 Your data is safe with us. (We have no idea what to do with it.)"
      ];
      return { text: msgs[Math.floor(Math.random() * msgs.length)] };
    }
  },
  titleix: {
    emojis: ['⏳', '📋', '🕰️', '⏰', '📑', '🗂️'],
    colors: ['#ffc107', '#e0a800', '#c69500', '#ffca2b'],
    flash: 'rgba(255,193,7,0.08)',
    makeToast: function() {
      var pcts = ['3%', '7%', '2%', '4%', '1%'];
      var pct = pcts[Math.floor(Math.random() * pcts.length)];
      var msgs = [
        "⏳ Your case: #847. Progress: ░░░░ " + pct + ". Estimated completion: Q4 2028.",
        "📋 Investigation status: Your inquiry is important to us. Please hold. Forever.",
        "🕰️ The Title IX office has received your report. They'll get to it. Eventually.",
        "📑 Queue position: 847. There are 846 people ahead of you. They've all accepted this."
      ];
      return { text: msgs[Math.floor(Math.random() * msgs.length)] };
    }
  },
  complaint: {
    emojis: ['📮', '✅', '📨', '🗑️', '💬', '📬'],
    colors: ['#dc3545', '#c82333', '#28a745', '#218838', '#a72834'],
    flash: 'rgba(220,53,69,0.1)',
    makeToast: function() {
      var msgs = [
        "📮 Complaint filed. It has joined the others. They are all together now.",
        "✅ Your feedback is important to us. We've filed it where the sun doesn't shine. (Behind the Eatery.)",
        "📨 Message received. It has been added to the void. The void is full. It's fine.",
        "🗑️ Complaint successfully submitted. Processing time: 2-4 business years."
      ];
      return { text: msgs[Math.floor(Math.random() * msgs.length)] };
    }
  }
};

document.querySelectorAll('[data-effect]').forEach(function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    var key = this.getAttribute('data-effect');
    var fx = effects[key];
    if (fx) triggerEffect(fx);
  });
});

function triggerEffect(fx) {
  if (fx.counter) {
    rubCount++;
    document.getElementById('rubCount').textContent = rubCount;
    var cnt = document.getElementById('otterCounter');
    cnt.classList.remove('bump');
    void cnt.offsetWidth;
    cnt.classList.add('bump');
  }

  var flash = document.createElement('div');
  flash.className = 'rub-flash';
  flash.style.background = 'radial-gradient(circle at center, ' + fx.flash + ' 0%, transparent 70%)';
  document.body.appendChild(flash);
  setTimeout(function() { flash.remove(); }, 800);

  var toastData = fx.makeToast();
  var toast = document.createElement('div');
  toast.className = 'rub-toast';
  if (toastData.html) {
    toast.innerHTML = toastData.html;
  } else {
    toast.textContent = toastData.text;
  }
  document.body.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 3000);

  for (var i = 0; i < 30; i++) {
    (function() {
      var p = document.createElement('div');

      if (Math.random() > 0.5) {
        p.className = 'rub-particle emoji';
        p.textContent = fx.emojis[Math.floor(Math.random() * fx.emojis.length)];
      } else {
        p.className = 'rub-particle';
        p.style.background = fx.colors[Math.floor(Math.random() * fx.colors.length)];
        var size = 6 + Math.random() * 12;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
      }

      var cx = window.innerWidth / 2;
      var cy = window.innerHeight / 2;
      var angle = Math.random() * Math.PI * 2;
      var dist = 120 + Math.random() * 300;

      p.style.left = (cx - 6) + 'px';
      p.style.top = (cy - 6) + 'px';
      p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');

      document.body.appendChild(p);
      setTimeout(function() { p.remove(); }, 1400);
    })();
  }
}
