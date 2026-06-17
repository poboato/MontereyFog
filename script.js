/* ── Safe localStorage wrapper (Chrome blocks access in third-party iframes) ── */

function lsGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, val); } catch (e) { /* noop */ }
}

/* ── Mobile Nav Toggle ── */

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
      '<p>✅ Buff stacked! Your test scores keep climbing.</p>' +
      '<p>Rub again for additional gains. Stacked buffs persist across sessions. (Results may vary. ' +
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
  },
  budget: {
    title: '💰 CSUMB Budget Overview',
    body: '<p><strong>Where Did All the Money Go? Great Question.</strong></p>' +
      '<p><strong>2024-25 Highlights:</strong><br>' +
      '• <strong>Deficit:</strong> $12 million (we call this a "structural enhancement opportunity")<br>' +
      '• <strong>Staff laid off:</strong> 12 (plus 4 managers "not retained")<br>' +
      '• <strong>Student-to-faculty ratio:</strong> Increased to 28.6:1 ("efficiency")<br>' +
      '• <strong>New science building announced:</strong> $50 million (great timing)<br>' +
      '• <strong>Hiring freeze:</strong> In effect, except for the person who had to announce the freeze</p>' +
      '<p><strong>How you can help:</strong><br>' +
      '1. Buy a parking permit ($588 — every little bit helps)<br>' +
      '2. Rub the otter statue\'s nose (we count it as revenue)<br>' +
      '3. Accept that the math may never math</p>' +
      '<p style="font-size: 11px; color: #888;">We are not in a crisis. We are "right-sizing the student experience."</p>',
    buttons: [
      { text: '😬 That\'s Concerning', class: 'modal-btn modal-btn-close', action: 'close' }
    ]
  },
  commuter: {
    title: '🚗 Commuter Survival Guide',
    body: '<p><strong>Welcome to the 40%.</strong></p>' +
      '<p><strong>Your commute, by the numbers:</strong><br>' +
      '• 3.5 hours each way (if you\'re Natalie from HCOM, and you are)<br>' +
      '• $100+/week in gas (that\'s a parking permit every 5 weeks!)<br>' +
      '• 47 named potholes on Highway 1<br>' +
      '• 15 minutes circling Lot B before you accept Lot 59</p>' +
      '<p><strong>Commuter Advisory Board update:</strong> The board exists. The commuter lounge is "being developed." The gas card request is in review. The therapy dog for the Lot 59 walk has been approved in spirit.</p>' +
      '<p><strong>Pro tips:</strong><br>' +
      '• MST buses are free with your student ID (the bus stop is only 10 minutes from class)<br>' +
      '• The Otter Cycle Center rents bikes for $100/semester (vs $441 for parking — savings! And cardio!)<br>' +
      '• If you see another commuter, nod at them. You\'re in this together.</p>' +
      '<p style="font-size: 11px; color: #888;">Estimated time until commuter lounge opens: 2-4 business years</p>',
    buttons: [
      { text: '🚌 I\'ll Take the Bus', class: 'modal-btn modal-btn-close', action: 'close' }
    ]
  },
  nightlife: {
    title: '🌙 CSUMB Nightlife Guide',
    body: '<p><strong>Welcome to the Nightlife. (It\'s quiet.)</strong></p>' +
      '<p><strong>Available after 10pm:</strong><br>' +
      '• The vending machine in the library ($4 Kind Bars, accepts card)<br>' +
      '• Studying (you have exams)<br>' +
      '• Walking across campus in the fog (free, atmospheric)<br>' +
      '• Waiting for MyRaft to come back online<br>' +
      '• Contemplating your choices</p>' +
      '<p><strong>What\'s NOT available after 10pm:</strong><br>' +
      '• The dining hall (closes at 8pm, like a retirement home)<br>' +
      '• Parties (they get shut down immediately — "it\'s like they don\'t want you to have fun")<br>' +
      '• The sun (it set hours ago, behind the fog)<br>' +
      '• Social events that aren\'t painting tote bags</p>' +
      '<p>Students describe the scene as "PG-13" and "like a middle school dance." The Monte Mash is our version of a tailgate. We\'re not proud. We\'re just tired.</p>' +
      '<p style="font-size: 11px; color: #888;">Last party shut down: approximately 9:47pm. Every night.</p>',
    buttons: [
      { text: '📚 I\'ll Just Study', class: 'modal-btn modal-btn-close', action: 'close' }
    ]
  },
  housingcrisis: {
    title: '🏠 Housing Crisis HQ',
    body: '<p><strong>You want housing? So does everyone else.</strong></p>' +
      '<p><strong>Current status:</strong><br>' +
      '• Waitlist peaked at <strong>300+ students</strong><br>' +
      '• System migrated to a Ticketmaster-style queue (you get the same result — disappointment)<br>' +
      '• Gavilan Hall: was an office building, now a dorm. Your bed is where a spreadsheet was.<br>' +
      '• Triples are now quads. Quads are now "learning communities."<br>' +
      '• The Dunes ($1M condos across the street): available if you have a spare million</p>' +
      '<p><strong>What students are saying:</strong><br>' +
      '"I\'ve tried for housing three semesters in a row. I\'ve gotten better seats at a Taylor Swift concert." — Marissa B.</p>' +
      '<p style="font-size: 11px; color: #888;">The otter statue is also out of housing. It lives outside. Permanently.</p>',
    buttons: [
      { text: '😭 Add Me to the Waitlist', class: 'modal-btn modal-btn-close', action: 'close' }
    ]
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
var rubBuffs = JSON.parse(lsGet('montereyfog-buffs') || '{"academics":0,"wisdom":0,"validation":0,"degree":0,"parkingLuck":0,"conspire":0,"fortOrd":0,"sarcasm":0,"caffeine":0,"procrastination":0}');

var buffStatDefs = [
  { key: 'academics', label: 'Academics', emoji: '📚' },
  { key: 'wisdom', label: 'Wisdom', emoji: '🧠' },
  { key: 'validation', label: 'Validation', emoji: '✅' },
  { key: 'degree', label: 'Degree', emoji: '🎓' },
  { key: 'parkingLuck', label: 'Parking Luck', emoji: '🅿️' },
  { key: 'conspire', label: 'Conspire', emoji: '🤝' },
  { key: 'fortOrd', label: 'Fort Ord Lore', emoji: '🏛️' },
  { key: 'sarcasm', label: 'Sarcasm', emoji: '😏' },
  { key: 'caffeine', label: 'Caffeine', emoji: '☕' },
  { key: 'procrastination', label: 'Procrastination', emoji: '⏰' }
];

function updateBuffDisplay() {
  var el = document.getElementById('rubBuffsDisplay');
  if (!el) return;
  var parts = [];
  buffStatDefs.forEach(function(s) {
    var val = rubBuffs[s.key] || 0;
    if (val > 0) parts.push(s.emoji + '+' + val.toFixed(1) + '%');
  });
  document.getElementById('rubBuffsDisplay').textContent = parts.length ? parts.join(' ') : '✨';
}

function saveBuffs() {
  lsSet('montereyfog-buffs', JSON.stringify(rubBuffs));
}

var effects = {
  rubnose: {
    emojis: ['🦦', '✨', '🌟', '💫', '⭐', '🏅', '🎉'],
    colors: ['#c9a84c', '#dbbf5e', '#e8d48b', '#ffffff', '#689466'],
    flash: 'rgba(201,168,76,0.15)',
    counter: true,
    makeToast: function(statKey, pct) {
      var pctStr = pct.toFixed(2);
      var totalForStat = (rubBuffs[statKey] || 0).toFixed(2);
      var emoji = ({ academics:'📚', wisdom:'🧠', validation:'✅', degree:'🎓', parkingLuck:'🅿️', conspire:'🤝', fortOrd:'🏛️', sarcasm:'😏', caffeine:'☕', procrastination:'⏰' })[statKey] || '✨';
      var msgs = {
        academics: [
          "Your exam scores increased by {pct}%. (Academics total: +{total}%)",
          "Ancient otter magic swirls around you. Grades +{pct}% (Academics: +{total}%)",
          "That 8 a.m. class is {pct}% less painful now. (Academics: +{total}%)",
          "Your GPA just went up {pct}%. The otter is grading now. (Academics: +{total}%)",
          "Professor said 'nice job' — {pct}% more confident. (Academics: +{total}%)",
          "You understand the reading {pct}% more. Still haven't done it. (Academics: +{total}%)"
        ],
        wisdom: [
          "The bronze otter grants you {pct}% more wisdom. (Wisdom: +{total}%)",
          "You see through the fog {pct}% better now. (Wisdom: +{total}%)",
          "You're {pct}% wiser. You still park in Lot B though. (Wisdom: +{total}%)",
          "The otter whispers secrets. You retain {pct}%. (Wisdom: +{total}%)",
          "You've gained {pct}% life experience from staring at fog. (Wisdom: +{total}%)",
          "You're {pct}% more likely to bring an umbrella when it's sunny. Classic. (Wisdom: +{total}%)",
          "You now understand {pct}% more of the fog's cryptic messages. (Wisdom: +{total}%)"
        ],
        validation: [
          "You feel a warm sense of academic validation. (+{pct}%, Validation: +{total}%)",
          "The otter believes in you. That's {pct}% more support than your advisor. (Validation: +{total}%)",
          "Your imposter syndrome decreased by {pct}%. (Validation: +{total}%)",
          "Someone said 'you got this' and it was {pct}% effective. (Validation: +{total}%)",
          "You feel {pct}% more seen by the administration. They still won't answer your email. (Validation: +{total}%)",
          "Your self-worth is now {pct}% less dependent on grades. (Validation: +{total}%)"
        ],
        degree: [
          "Your degree is now {pct}% more valuable. (Degree Value: +{total}%)",
          "Your diploma will be {pct}% shinier. (Degree Value: +{total}%)",
          "That degree is {pct}% more useful as a frisbee. Still counts. (Degree Value: +{total}%)",
          "Your student loans are now {pct}% worth it. (Degree Value: +{total}%)",
          "You're {pct}% more likely to frame your diploma instead of using it as a coaster. (Degree Value: +{total}%)",
          "That degree is {pct}% more recognized outside of Monterey. Two people have heard of this school. (Degree Value: +{total}%)"
        ],
        parkingLuck: [
          "Parking tickets will now miss you {pct}% of the time. (Parking Luck: +{total}%)",
          "A spot in Lot B opened up — {pct}% closer than last time. (Parking Luck: +{total}%)",
          "Your parking permit is {pct}% less of a scam. (Parking Luck: +{total}%)",
          "The parking fairy visited. You're {pct}% less angry. (Parking Luck: +{total}%)",
          "That meter you fed has {pct}% more time on it than you paid for. (Parking Luck: +{total}%)",
          "You're {pct}% more likely to find a spot with your name on it. It's fate. Or desperation. (Parking Luck: +{total}%)"
        ],
        conspire: [
          "Your conspiracy theories are {pct}% more convincing. (Conspire: +{total}%)",
          "The fog is {pct}% more likely to be a government experiment. (Conspire: +{total}%)",
          "You're {pct}% better at connecting dots that don't exist. (Conspire: +{total}%)",
          "The bronze otter is definitely moving when you're not looking. Belief: +{pct}%. (Conspire: +{total}%)",
          "You're {pct}% sure the Eatery's '8 concepts' are actually one concept in a trench coat. (Conspire: +{total}%)",
          "The fog has an agenda. You're {pct}% closer to proving it. (Conspire: +{total}%)"
        ],
        fortOrd: [
          "You know {pct}% more Fort Ord trivia. Did you know it had a bowling alley? (Fort Ord Lore: +{total}%)",
          "You can identify {pct}% more abandoned buildings by name. (Fort Ord Lore: +{total}%)",
          "Your knowledge of army base history increased by {pct}%. The barracks miss you. (Fort Ord Lore: +{total}%)",
          "You're {pct}% better at explaining why everything looks like it's from 1985. (Fort Ord Lore: +{total}%)",
          "You can now name {pct}% more tanks that used to be parked here. (Fort Ord Lore: +{total}%)",
          "Your Fort Ord ghost story collection grew by {pct}%. The barracks are definitely haunted. (Fort Ord Lore: +{total}%)"
        ],
        sarcasm: [
          "Your sarcasm is {pct}% more biting. The fog is impressed. (Sarcasm: +{total}%)",
          "You're {pct}% more likely to say 'oh great' and mean the opposite. (Sarcasm: +{total}%)",
          "That eye roll was {pct}% more effective. (Sarcasm: +{total}%)",
          "Your 'thanks, I hate it' delivery improved by {pct}%. (Sarcasm: +{total}%)",
          "You're {pct}% better at saying 'love that for you' without meaning it. (Sarcasm: +{total}%)",
          "Your ability to weaponize 'wow' increased by {pct}%. (Sarcasm: +{total}%)"
        ],
        caffeine: [
          "Your caffeine tolerance increased by {pct}%. The Eatery coffee is still undrinkable. (Caffeine: +{total}%)",
          "You can now function on {pct}% less sleep. The otter is concerned. (Caffeine: +{total}%)",
          "Your blood is now {pct}% coffee. This is fine. (Caffeine: +{total}%)",
          "You're {pct}% more likely to risk a second cup from the Eatery. It's a gamble. (Caffeine: +{total}%)",
          "Your caffeine addiction is {pct}% more socially acceptable when you call it a 'ritual'. (Caffeine: +{total}%)",
          "That pre-8am coffee is {pct}% more necessary for survival. (Caffeine: +{total}%)"
        ],
        procrastination: [
          "Your procrastination efficiency increased by {pct}%. You'll deal with this later. (Procrastination: +{total}%)",
          "You're {pct}% better at finding things to do instead of studying. (Procrastination: +{total}%)",
          "You've perfected the art of doing nothing for {pct}% longer. (Procrastination: +{total}%)",
          "That assignment is {pct}% more due tomorrow. You'll start tonight. Probably. (Procrastination: +{total}%)",
          "You've scrolled for {pct}% more minutes instead of studying. Productive. (Procrastination: +{total}%)",
          "Your 'I work better under pressure' belief intensified by {pct}%. (Procrastination: +{total}%)"
        ]
      };
      var statMsgs = msgs[statKey] || ["{pct}% boost to " + statKey + ". Total: +{total}%"];
      var msg = statMsgs[Math.floor(Math.random() * statMsgs.length)].replace('{pct}', pctStr).replace('{total}', totalForStat);
      return { html: '<span class="pct">' + emoji + ' +' + pctStr + '%</span>' + msg };
    }
  }
};

document.querySelectorAll('[data-effect]').forEach(function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    var key = this.getAttribute('data-effect');
    var fx = effects[key];
    if (fx) { triggerEffect(fx); }
    else if (modals[key]) { showModal(key); }
  });
});

var rewards = {
  5:   { title: '🐣 Novice Nose Rubber',      msg: 'You have rubbed the nose 5 times. The otter acknowledges your presence.' },
  10:  { title: '🔟 Double Digits!',           msg: '10 nose rubs! The bronze otter is now slightly warm to the touch.' },
  15:  { title: '💪 Dedicated',                msg: '15 rubs. Your dedication is noted. The otter\\\'s nose is now a family heirloom.' },
  20:  { title: '🎯 Two Decades of Rubs',      msg: '20 nose rubs! You\\\'ve entered the Otter Appreciation Society.' },
  25:  { title: '🏅 Quarter Century Club',     msg: '25 rubs! The otter has nominated you for a campus excellence award.' },
  50:  { title: '🌟 Otter Whisperer',          msg: '50 NOSE RUBS! You can now communicate with otters. They say "rub my nose."' },
  75:  { title: '👑 Platinum Otter',           msg: '75 rubs! The bronze otter has been polished to a mirror finish by YOUR hands.' },
  100: { title: '⚜️ Otter Royalty',           msg: '100 NOSE RUBS! The otter has granted you a lifetime supply of fog. You\\\'re welcome.' }
};

function getReward(count) {
  if (rewards[count]) return rewards[count];
  if (count > 100 && count % 50 === 0) return { title: '🎉 ' + count + ' Rubs!', msg: 'You\\\'ve rubbed the nose ' + count + ' times. The otter is now a campus legend. So are you.' };
  if (count > 25 && count % 25 === 0) return { title: '✨ ' + count + ' Rubs!', msg: 'The otter appreciates your ' + count + ' nose rubs. This is your life now.' };
  return null;
}

function showReward(reward, count) {
  var earned = JSON.parse(lsGet('montereyfog-badges') || '[]');
  if (earned.indexOf(count) !== -1) return;
  earned.push(count);
  lsSet('montereyfog-badges', JSON.stringify(earned));
  var container = document.getElementById('badgeContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'badgeContainer';
    container.className = 'badge-container';
    document.body.appendChild(container);
  }
  var badge = document.createElement('div');
  badge.className = 'reward-badge';
  badge.innerHTML = '<span class="badge-title">' + reward.title + '</span><span class="badge-sub">' + count + ' Nose Rubs</span>';
  container.appendChild(badge);
  setTimeout(function() { badge.classList.add('badge-shake'); }, 200);
}

function restoreBadges() {
  var earned = JSON.parse(lsGet('montereyfog-badges') || '[]');
  if (earned.length === 0) return;
  var container = document.createElement('div');
  container.id = 'badgeContainer';
  container.className = 'badge-container';
  document.body.appendChild(container);
  earned.forEach(function(count) {
    var reward = getReward(count);
    if (!reward) return;
    var badge = document.createElement('div');
    badge.className = 'reward-badge';
    badge.innerHTML = '<span class="badge-title">' + reward.title + '</span><span class="badge-sub">' + count + ' Nose Rubs</span>';
    container.appendChild(badge);
  });
}
restoreBadges();
updateBuffDisplay();

function triggerEffect(fx) {
  var isReward = false;
  var statKey = null;
  var perRubPct = null;
  if (fx.counter) {
    rubCount++;
    var rubCountEl = document.getElementById('rubCount');
    if (rubCountEl) rubCountEl.textContent = rubCount;

    var keys = ['academics', 'wisdom', 'validation', 'degree', 'parkingLuck', 'conspire', 'fortOrd', 'sarcasm', 'caffeine', 'procrastination'];
    statKey = keys[Math.floor(Math.random() * keys.length)];
    perRubPct = parseFloat((Math.random() * 14.99 + 0.01).toFixed(2));
    rubBuffs[statKey] = parseFloat(((rubBuffs[statKey] || 0) + perRubPct).toFixed(2));
    saveBuffs();
    updateBuffDisplay();

    var cnt = document.getElementById('otterCounter');
    if (cnt) {
      cnt.classList.remove('bump');
      void cnt.offsetWidth;
      cnt.classList.add('bump');
    }
    var reward = getReward(rubCount);
    if (reward) {
      isReward = true;
      showReward(reward, rubCount);
    }
  }

  var flashColor = isReward ? 'rgba(201,168,76,0.3)' : fx.flash;
  var flash = document.createElement('div');
  flash.className = 'rub-flash';
  flash.style.background = 'radial-gradient(circle at center, ' + flashColor + ' 0%, transparent 70%)';
  document.body.appendChild(flash);
  setTimeout(function() { flash.remove(); }, isReward ? 500 : 400);

  var toastData = fx.makeToast(statKey, perRubPct);
  var toast = document.createElement('div');
  toast.className = 'rub-toast';
  if (toastData.html) {
    toast.innerHTML = toastData.html;
  } else {
    toast.textContent = toastData.text;
  }
  document.body.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 3000);

  var particleCount = isReward ? 600 : 30;
  for (var i = 0; i < particleCount; i++) {
    (function() {
      var p = document.createElement('div');

      var rewardEmojis = ['🎉', '🎊', '🏆', '👑', '💎', '🌟', '✨', '🎯'];
      var emojis = isReward ? rewardEmojis : fx.emojis;
      if (Math.random() > 0.5) {
        p.className = 'rub-particle emoji';
        p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      } else {
        p.className = 'rub-particle';
        var rewardColors = ['#c9a84c', '#dbbf5e', '#e8d48b', '#ffffff', '#ffd700', '#ffecb3'];
        var colors = isReward ? rewardColors : fx.colors;
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
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
      setTimeout(function() { p.remove(); }, 800);
    })();
  }
}

/* ── Dark Mode ── */

(function() {
  var toggle = document.getElementById('darkToggle');
  var stored = lsGet('montereyfog-dark');
  if (stored === 'true') {
    document.body.classList.add('dark-mode');
    toggle.textContent = '☀️';
  }
  toggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    var isDark = document.body.classList.contains('dark-mode');
    toggle.textContent = isDark ? '☀️' : '🌙';
    lsSet('montereyfog-dark', isDark);
  });
})();

/* ── Search ── */

(function() {
  var input = document.getElementById('siteSearch');
  var btn = document.getElementById('searchBtn');
  function doSearch() {
    var q = input.value.trim().toLowerCase();
    var mainContent = document.querySelector('.main-content');
    if (!mainContent) return;
    var items = mainContent.querySelectorAll('.news-item, .testimonial, .fun-fact, .love-letter, .shoutout, .pro-con, .card, .disclaimer');
    items.forEach(function(el) { el.classList.remove('search-hidden'); });
    var noResults = mainContent.querySelector('.no-search-results');
    if (noResults) noResults.remove();
    if (!q) return;
    var anyVisible = false;
    items.forEach(function(el) {
      var text = el.textContent.toLowerCase();
      if (text.indexOf(q) === -1) {
        el.classList.add('search-hidden');
      } else {
        anyVisible = true;
      }
    });
    if (!anyVisible) {
      var msg = document.createElement('p');
      msg.className = 'no-search-results';
      msg.style.cssText = 'text-align: center; padding: 24px; color: #888; font-style: italic;';
      msg.textContent = '🔍 No results found in the fog. Try a different search.';
      mainContent.appendChild(msg);
    }
  }
  if (input) input.addEventListener('input', doSearch);
  if (btn) btn.addEventListener('click', function(e) { e.preventDefault(); doSearch(); });
})();

/* ── Visitor Counter ── */

(function() {
  var el = document.getElementById('visitorCount');
  var count = lsGet('montereyfog-visits');
  if (!count) {
    count = 1;
  } else {
    count = parseInt(count, 10) + 1;
  }
  lsSet('montereyfog-visits', count);
  el.textContent = '🦦 Visitor #' + count;
})();

/* ── Live Weather ── */

(function() {
  var MONTEREY_LAT = 36.6002;
  var MONTEREY_LON = -121.8947;
  var WEATHER_API = 'https://api.open-meteo.com/v1/forecast?latitude=' + MONTEREY_LAT + '&longitude=' + MONTEREY_LON + '&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,uv_index&timezone=America%2FLos_Angeles';

  function wmoToParody(code, tempC, humidity) {
    var foggy = code === 45 || code === 48;
    var clear = code === 0;
    var cloudy = code >= 1 && code <= 3;
    var rainy = (code >= 51 && code <= 67) || (code >= 80 && code <= 82);
    var stormy = code >= 95;
    if (foggy || (humidity > 85 && tempC < 16)) {
      return {
        cond: '🚨 DENSE FOG ADVISORY (Live)',
        temp: tempC + '°C / ' + Math.round(tempC * 9/5 + 32) + '°F',
        extra: 'Visibility: ' + (humidity > 90 ? '0.5' : '2') + ' otters<br>UV Index: "What\'s UV?"<br>Humidity: ' + humidity + '%<br>Wind: ' + (5 + Math.round(Math.random() * 15)) + ' mph of marine layer'
      };
    }
    if (stormy) {
      return {
        cond: '⛈️ CSUMB HAS BECOME A WAR ZONE (Live)',
        temp: tempC + '°C / ' + Math.round(tempC * 9/5 + 32) + '°F',
        extra: 'Visibility: 0 otters (seek shelter)<br>UV Index: N/A (sky is angry)<br>Humidity: ' + humidity + '%<br>Wind: Apocalyptic'
      };
    }
    if (rainy) {
      return {
        cond: '🌧️ The Fog Has Manifested (Live)',
        temp: tempC + '°C / ' + Math.round(tempC * 9/5 + 32) + '°F',
        extra: 'Visibility: 1 otter (wet)<br>UV Index: Blocked by existential dread<br>Humidity: ' + humidity + '%<br>Condition: Water falling from sky, as foretold'
      };
    }
    if (cloudy) {
      return {
        cond: '☁️ Marine Layer Holding Strong (Live)',
        temp: tempC + '°C / ' + Math.round(tempC * 9/5 + 32) + '°F',
        extra: 'Visibility: 3 otters<br>UV Index: "Maybe tomorrow"<br>Humidity: ' + humidity + '%<br>Forecast: Clouds, then more clouds'
      };
    }
    if (clear) {
      return {
        cond: '🌤️ WHAT IS THIS? THE SUN?? (Live)',
        temp: tempC + '°C / ' + Math.round(tempC * 9/5 + 32) + '°F',
        extra: 'Visibility: 50 otters (campus in shock)<br>UV Index: ACTUALLY EXISTS<br>Humidity: ' + humidity + '%<br>Warning: Sun may cause confusion and brief happiness'
      };
    }
    return {
      cond: '🌫️ Fog Adjacent Conditions (Live)',
      temp: tempC + '°C / ' + Math.round(tempC * 9/5 + 32) + '°F',
      extra: 'Visibility: ¯\\_(ツ)_/¯ otters<br>UV Index: Gone<br>Humidity: ' + humidity + '%<br>Forecast: Fog will find you'
    };
  }

  function updateWeatherWidget(widget, data) {
    if (!widget) return;
    var condEl = widget.querySelector('.cond');
    var tempEl = widget.querySelector('.temp');
    var extraEl = widget.querySelector('.weather-extras');
    if (condEl) condEl.textContent = data.cond;
    if (tempEl) tempEl.textContent = data.temp;
    if (extraEl) extraEl.innerHTML = data.extra + '<br>Forecast: More fog';
  }

  function fetchWeather() {
    return fetch(WEATHER_API)
      .then(function(r) { return r.json(); })
      .then(function(json) {
        var c = json.current;
        var parody = wmoToParody(c.weather_code, c.temperature_2m, c.relative_humidity_2m);
        document.querySelectorAll('.weather-widget').forEach(function(w) {
          updateWeatherWidget(w, parody);
        });
        window._campusWeather = { code: c.weather_code, temp: c.temperature_2m, humidity: c.relative_humidity_2m, wind: c.wind_speed_10m };
        if (window.campusMoodRefresh) window.campusMoodRefresh();
      })
      .catch(function() {
        var fallback = { cond: '🌫️ Fog Advisory (Data Lost in the Fog)', temp: '57°F / 14°C', extra: 'Visibility: ¯\\_(ツ)_/¯<br>UV Index: Not today<br>Humidity: Yes<br>Live data got lost in the marine layer' };
        document.querySelectorAll('.weather-widget').forEach(function(w) {
          updateWeatherWidget(w, fallback);
        });
        window._campusWeather = null;
        if (window.campusMoodRefresh) window.campusMoodRefresh();
      });
  }

  fetchWeather();
  setInterval(fetchWeather, 600000);

  document.querySelectorAll('.weather-refresh').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var self = this;
      self.textContent = '↻ Refreshing...';
      self.disabled = true;
      fetchWeather().then(function() {
        self.textContent = '↻ ✓ Live';
        setTimeout(function() { self.textContent = '↻ Refresh'; self.disabled = false; }, 2000);
        if (window.campusMoodRefresh) window.campusMoodRefresh();
      }).catch(function() {
        self.textContent = '↻ Refresh';
        self.disabled = false;
        if (window.campusMoodRefresh) window.campusMoodRefresh();
      });
    });
  });
})();

/* ── Scroll to Top ── */

(function() {
  var btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
  btn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Real vs. Parody Quiz ── */

(function() {
  var questions = [
    { fact: 'The CSUMB library cost $64 million to build and students are allowed to eat and drink inside it.', answer: 'real', explanation: 'The Tanimura & Antle Library is 136,000 sq ft of glass, concrete, and "architectural performance art." Food and drink are welcome.', source: 'csumb.edu / local news' },
    { fact: 'CSUMB issues every incoming freshman a compass because students frequently get lost in the fog.', answer: 'parody', explanation: 'They don\'t issue compasses. They just let you figure it out. That\'s called "character building."', source: 'Made up (but believable)' },
    { fact: 'CSUMB\'s scientific diving program is the largest in the United States, training over 300 divers per year.', answer: 'real', explanation: 'CSUMB issues more scientific dive certifications than any other university in the country.', source: 'csumb.edu / NOAA' },
    { fact: 'There is a mandatory 1-credit course called "Otter Etiquette 101" required for all freshmen.', answer: 'parody', explanation: 'There is no such course. But students do rub a bronze otter\'s nose for good luck, which is somehow weirder.', source: 'Made up (but we wish)' },
    { fact: '61% of CSUMB students are first-generation college students.', answer: 'real', explanation: 'Nearly two-thirds of students are the first in their family to attend college.', source: 'csumb.edu / U.S. News' },
    { fact: 'The dining hall\'s "Ghost Kitchen" is actually run by the ghost of a former Fort Ord chef.', answer: 'parody', explanation: 'The Ghost Kitchen is a real rotating concept at the Eatery — but it\'s run by living, breathing culinary staff. Probably.', source: 'Made up (the Ghost Kitchen is real, the ghost is not)' },
    { fact: 'CSUMB ranks #5 in the nation for social mobility, according to U.S. News & World Report.', answer: 'real', explanation: 'CSUMB consistently ranks among the top universities in the country for lifting students into higher economic brackets.', source: 'U.S. News & World Report' },
    { fact: 'The school\'s fight song is called "Fog, Fog, Fog" and consists of a single note held for 30 seconds.', answer: 'parody', explanation: 'CSUMB doesn\'t actually have a fight song. They have fog. Lots of fog. The fog doesn\'t sing.', source: 'Made up' },
    { fact: 'The CSUMB campus was built on a decommissioned Army base — Fort Ord, closed in 1994.', answer: 'real', explanation: 'Fort Ord was a major Army training base until 1994. CSUMB was founded the same year on the same land, reusing many of the buildings.', source: 'csumb.edu / Wikipedia' },
    { fact: 'The university offers a minor in "Fog Appreciation Studies."', answer: 'parody', explanation: 'There is no such minor. But with 180+ foggy days per year, students certainly get enough hands-on experience.', source: 'Made up' },
    { fact: 'The bronze otter statue on campus was vandalized with "fix housing" 11 days after being unveiled in April 2025.', answer: 'real', explanation: 'The 9-foot "Otters for Life" statue was wrapped in toilet paper and tagged with black ink referencing the campus housing crisis.', source: 'The Lutrinae / Monterey County Weekly' },
    { fact: 'CSUMB requires all students to complete a 2-week wilderness survival course in the fog before starting classes.', answer: 'parody', explanation: 'No survival course exists, but the fog does make simply finding your classroom feel like one.', source: 'Made up' },
    { fact: 'CSUMB had a $12 million budget deficit in 2024 and laid off 12 staff members.', answer: 'real', explanation: 'The university faced a $12M structural deficit, leading to layoffs, a hiring freeze, and raising the student-to-faculty ratio to 28.6:1.', source: 'KSBW / The Lutrinae' },
    { fact: 'There is a secret tunnel system under campus that connects the dorms to the dining hall.', answer: 'parody', explanation: 'There are no secret tunnels — just the fog making everything feel underground.', source: 'Made up' },
    { fact: 'CSUMB recently announced a $50 million new science building while simultaneously cutting faculty positions.', answer: 'real', explanation: 'In 2025, CSUMB announced a new science and engineering building housing marine science and NOAA, shortly after budget cuts and layoffs.', source: 'KSBW / csumb.edu' },
    { fact: 'The dining hall\'s "Creamy Chicken Thing" was officially trademarked by the university in 2023.', answer: 'parody', explanation: 'The "Creamy Chicken Thing" is a real Eatery menu item described on the whiteboard — but it is not trademarked. Yet.', source: 'Made up (but the whiteboard item is real)' },
    { fact: '40% of CSUMB students commute from off campus, with some driving over 3.5 hours each way.', answer: 'real', explanation: 'Nearly half of students commute, many from over 20 miles away in the tri-county area.', source: 'CSUMB enrollment data / Medium Otter News' },
    { fact: 'CSUMB has its own app that alerts students whenever the sun comes out so they can take photos.', answer: 'parody', explanation: 'There is no sun-alert app. But given there are only about 10 sunny days per year, the demand is there.', source: 'Made up' },
    { fact: 'A chemistry professor left UCLA specifically to teach at CSUMB because she wanted to work with undergraduates.', answer: 'real', explanation: 'Assistant Professor Roshini Ramachandran joined CSUMB from UCLA in 2023, choosing a CSU campus for its focus on undergraduate research.', source: 'csumb.edu news' }
  ];

  var LS_KEY = 'montereyfog-quiz-best';
  var current = 0;
  var score = 0;
  var answered = [];

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function renderProgress() {
    var el = document.getElementById('quizProgress');
    if (!el) return;
    var html = '';
    for (var i = 0; i < questions.length; i++) {
      var cls = 'quiz-dot';
      if (i === current && !answered[i]) cls += ' current';
      else if (answered[i] === true) cls += ' correct';
      else if (answered[i] === false) cls += ' wrong';
      html += '<span class="' + cls + '"></span>';
    }
    el.innerHTML = html;
  }

  function renderQuestion() {
    var q = questions[current];
    var card = document.getElementById('quizQuestion');
    var answers = document.getElementById('quizAnswers');
    var result = document.getElementById('quizResult');
    var scoreEl = document.getElementById('quizScore');
    if (card) card.textContent = (current + 1) + '. ' + q.fact;
    if (result) result.style.display = 'none';
    if (scoreEl) scoreEl.style.display = 'none';

    if (answers) {
      answers.innerHTML =
        '<button class="quiz-btn real" data-answer="real">✅ Real</button>' +
        '<button class="quiz-btn parody" data-answer="parody">❌ Parody</button>';
      answers.querySelectorAll('.quiz-btn').forEach(function(btn) {
        btn.addEventListener('click', handleAnswer);
      });
    }
    renderProgress();
  }

  function handleAnswer(e) {
    if (answered[current] !== undefined) return;
    var q = questions[current];
    var chosen = e.currentTarget.getAttribute('data-answer');
    var correct = chosen === q.answer;
    answered[current] = correct;
    if (correct) score++;

    var answers = document.getElementById('quizAnswers');
    answers.querySelectorAll('.quiz-btn').forEach(function(btn) {
      btn.disabled = true;
      var a = btn.getAttribute('data-answer');
      if (a === q.answer) btn.classList.add('correct');
      else if (a === chosen) btn.classList.add('wrong');
      btn.classList.add('reveal');
    });

    var result = document.getElementById('quizResult');
    if (result) {
      result.style.display = 'block';
      result.className = 'quiz-result ' + (correct ? 'correct' : 'wrong');
      result.innerHTML = (correct ? '✅ Correct! ' : '❌ Nope! ') + q.explanation +
        '<span class="quiz-source">Source: ' + q.source + '</span>' +
        (current < questions.length - 1
          ? '<button class="quiz-next" id="quizNext">Next →</button>'
          : '<button class="quiz-next" id="quizNext">See Results 🏆</button>');
      document.getElementById('quizNext').addEventListener('click', function() {
        current++;
        if (current < questions.length) {
          renderQuestion();
        } else {
          showResults();
        }
      });
    }
    renderProgress();
  }

  function showResults() {
    document.getElementById('quizQuestion').textContent = '';
    document.getElementById('quizAnswers').innerHTML = '';
    document.getElementById('quizResult').style.display = 'none';

    var pct = Math.round(score / questions.length * 100);
    var rank;
    if (pct === 100) rank = '🎓 Otter Professor — You know CSUMB better than the administration!';
    else if (pct >= 80) rank = '🦦 Senior Otter — You\'ve rubbed the statue\'s nose enough times.';
    else if (pct >= 60) rank = '📚 Junior Otter — Not bad! You\'ve definitely been to the library.';
    else if (pct >= 40) rank = '🌫️ Sophomore — The fog is clouding your judgment a bit.';
    else if (pct >= 20) rank = '🐣 Freshman — You just got here. It\'s fine.';
    else rank = '🅿️ Lot B Enthusiast — You spend too much time in the parking lot.';

    var best = parseInt(lsGet(LS_KEY), 10) || 0;
    if (score > best) {
      best = score;
      lsSet(LS_KEY, best);
    }

    var scoreEl = document.getElementById('quizScore');
    if (scoreEl) {
      scoreEl.style.display = 'block';
      scoreEl.innerHTML =
        '<h3>🎉 Quiz Complete!</h3>' +
        '<div class="score-num">' + score + ' / ' + questions.length + '</div>' +
        '<div class="score-label">' + pct + '% correct</div>' +
        '<div class="score-rank">' + rank + '</div>' +
        '<div class="quiz-best">Best: ' + best + ' / ' + questions.length + '</div>' +
        '<button class="quiz-restart" id="quizRestart">🔄 Play Again</button>';
      document.getElementById('quizRestart').addEventListener('click', resetQuiz);
    }

    renderProgress();
    updateLeaderboard(best);
  }

  function updateLeaderboard(best) {
    var el = document.getElementById('quizLeaderboard');
    if (!el) return;
    var pct = Math.round(best / questions.length * 100);
    el.innerHTML =
      '<p style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:4px;">🏆 Best Score</p>' +
      '<div style="font-size:2rem;font-weight:800;color:#c9a84c;font-family:\'Inter\',sans-serif;">' + best + ' / ' + questions.length + '</div>' +
      '<div style="font-size:12px;color:var(--text-secondary);">' + pct + '% correct</div>' +
      '<div style="font-size:11px;color:var(--text-muted);margin-top:8px;">' +
      (best === questions.length ? '🦦 Perfect score! You\'re basically an otter.' : best > 0 ? 'Keep rafting up!' : 'Play the quiz to see your score here.') +
      '</div>';
  }

  function resetQuiz() {
    current = 0;
    score = 0;
    answered = [];
    shuffle(questions);
    renderQuestion();
    document.getElementById('quizScore').style.display = 'none';
  }

  // Initialize quiz on page load if quiz elements exist
  var quizPanel = document.getElementById('quizContainer');
  if (quizPanel) {
    shuffle(questions);
    answered = [];
    current = 0;
    score = 0;
    renderQuestion();
    var best = parseInt(lsGet(LS_KEY), 10) || 0;
    updateLeaderboard(best);
  }
})();

/* ── Fog Density Overlay ── */

(function() {
  var FOG_KEY = 'montereyfog-fog';
  var SIM_KEY = 'montereyfog-sim';
  var overlay = document.getElementById('fogOverlay');
  var layers = overlay ? overlay.querySelectorAll('.fog-layer') : [];
  var particlesContainer = document.getElementById('fogParticles');
  var slider = document.getElementById('fogSlider');
  var label = document.getElementById('fogLabel');
  var toggle = document.getElementById('fogToggle');
  var simCheck = document.getElementById('fogSimCheck');

  var particleTimer = null;

  function setFog(val) {
    val = Math.max(0, Math.min(100, val));
    var opacity = val / 100;
    overlay.style.opacity = val > 0 ? 1 : 0;
    layers.forEach(function(layer) {
      layer.style.opacity = opacity;
    });
    if (label) label.textContent = val + '%';
    if (slider) slider.value = val;
    lsSet(FOG_KEY, val);
    updateParticles();
  }

  function restoreFog() {
    var val = parseInt(lsGet(FOG_KEY), 10) || 0;
    if (val > 0) setFog(val);
    var sim = lsGet(SIM_KEY) === 'true';
    if (simCheck) simCheck.checked = sim;
    if (sim) updateParticles();
  }

  function spawnParticle() {
    if (!particlesContainer) return;
    var el = document.createElement('div');
    el.className = 'fog-particle';
    var size = 160 + Math.random() * 280;
    el.style.width = size + 'px';
    el.style.height = (size * 0.35) + 'px';
    el.style.left = (Math.random() * 110 - 5) + '%';
    el.style.bottom = (-40 - Math.random() * 60) + 'px';
    el.style.opacity = 0.12 + Math.random() * 0.2;
    var dur = 14 + Math.random() * 18;
    el.style.animation = 'fogRise ' + dur + 's linear forwards';
    particlesContainer.appendChild(el);
    setTimeout(function() {
      if (el.parentNode) el.remove();
    }, dur * 1000);
  }

  function updateParticles() {
    var val = parseInt(lsGet(FOG_KEY), 10) || 0;
    var sim = simCheck ? simCheck.checked : false;
    if (particleTimer) { clearInterval(particleTimer); particleTimer = null; }
    if (particlesContainer) particlesContainer.innerHTML = '';
    if (val > 0 && sim) {
      var interval = Math.max(800, 3000 - val * 22);
      particleTimer = setInterval(spawnParticle, interval);
      for (var i = 0; i < 3; i++) setTimeout(spawnParticle, i * 500);
    }
  }

  if (slider) {
    slider.addEventListener('input', function() {
      setFog(parseInt(this.value, 10));
    });
  }

  if (simCheck) {
    simCheck.addEventListener('change', function() {
      lsSet(SIM_KEY, this.checked);
      updateParticles();
    });
  }

  if (toggle) {
    toggle.addEventListener('click', function() {
      var val = parseInt(lsGet(FOG_KEY), 10) || 0;
      if (val > 0) {
        setFog(0);
        toggle.classList.remove('active');
        toggle.textContent = '🌫️';
      } else {
        setFog(45);
        toggle.classList.add('active');
        toggle.textContent = '☀️';
      }
    });
    var cur = parseInt(lsGet(FOG_KEY), 10) || 0;
    if (cur > 0) {
      toggle.classList.add('active');
      toggle.textContent = '☀️';
    }
  }

  if (!document.getElementById('fogRiseStyle')) {
    var style = document.createElement('style');
    style.id = 'fogRiseStyle';
    style.textContent =
      '@keyframes fogRise {' +
      '  0% { transform: translateX(0) translateY(0) scale(0.5); opacity: 0; }' +
      '  8% { opacity: 0.4; }' +
      '  70% { opacity: 0.2; }' +
      '  100% { transform: translateX(' + (20 + Math.random() * 50) + 'px) translateY(-120vh) scale(1.4); opacity: 0; }' +
      '}';
    document.head.appendChild(style);
  }

  restoreFog();
})();

/* ── MyRaft Status Widget ── */

(function() {
  var RAFT_KEY = 'montereyfog-raft';
  var messages = [
    'MyRaft is currently down for scheduled maintenance. (The schedule is: always.)',
    'Error 503: Service Unavailable. Also Error 418: I\'m a teapot.',
    'Connection to MyRaft timed out. The server is on a coffee break. It\'s been 3 years.',
    'MyRaft is down. IT has been notified. IT is also down.',
    'We\'ve tried nothing and we\'re all out of ideas. MyRaft is down.',
    'MyRaft is loading. Please wait. We\'ve been saying that since 2019.',
    'Database connection failed. The database is in Lot B. We can\'t find it.',
    'MyRaft encountered an error: "The operation completed successfully." (It did not.)',
    'Cannot connect to MyRaft. The server is behind a paywall. The paywall is also down.',
    'MyRaft status: It\'s not you. It\'s us. It\'s definitely us. It\'s always us.',
    'MyRaft has been down for 0 days, 0 hours, and approximately forever.',
    'Warning: MyRaft may cause drowsiness, frustration, and a strong desire to transfer to a school with functional IT.',
    'MyRaft is currently being rebooted. The reboot started in 2022. Please hold.',
    'MyRaft is experiencing "spiritual difficulties." We\'ve consulted a shaman. He\'s also having trouble logging in.'
  ];
  var startTime = Date.now();

  function getRaftData() {
    var data = lsGet(RAFT_KEY);
    if (data) {
      try { return JSON.parse(data); } catch(e) {}
    }
    return { downSince: Date.now(), checks: 0, lastCheck: Date.now() };
  }

  function saveRaftData(data) {
    lsSet(RAFT_KEY, JSON.stringify(data));
  }

  function formatDuration(ms) {
    var seconds = Math.floor(ms / 1000);
    var days = Math.floor(seconds / 86400);
    seconds %= 86400;
    var hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    var mins = Math.floor(seconds / 60);
    if (days > 0) return days + 'd ' + hours + 'h ' + mins + 'm';
    if (hours > 0) return hours + 'h ' + mins + 'm';
    if (mins > 0) return mins + 'm ' + seconds + 's';
    return 'just now';
  }

  function updateWidget(animate) {
    var dot = document.getElementById('raftDot');
    var badge = document.getElementById('raftBadge');
    var msg = document.getElementById('raftMsg');
    var downtime = document.getElementById('raftDowntime');
    var checked = document.getElementById('raftChecked');

    if (!dot || !badge || !msg || !downtime || !checked) return;

    dot.style.background = '#dc3545';
    badge.textContent = 'DOWN';
    badge.style.background = '#dc3545';

    if (animate) {
      msg.style.opacity = 0;
      setTimeout(function() {
        msg.textContent = messages[Math.floor(Math.random() * messages.length)];
        msg.style.opacity = 1;
      }, 200);
    } else {
      msg.textContent = messages[Math.floor(Math.random() * messages.length)];
    }

    var data = getRaftData();
    var elapsed = Date.now() - data.downSince;
    downtime.textContent = 'Downtime: ' + formatDuration(elapsed);
    checked.textContent = formatDuration(Date.now() - data.lastCheck) + ' ago';
  }

  function handleRefresh() {
    var btn = document.getElementById('raftRefresh');
    if (!btn) return;
    btn.disabled = true;
    btn.textContent = '↻ Checking...';
    var data = getRaftData();
    data.checks++;
    data.lastCheck = Date.now();
    saveRaftData(data);

    setTimeout(function() {
      updateWidget(true);
      btn.textContent = '↻ Still Down';
      setTimeout(function() {
        btn.textContent = '↻ Check Again';
        btn.disabled = false;
      }, 1000);
    }, 1200 + Math.random() * 1800);
  }

  var btn = document.getElementById('raftRefresh');
  if (btn) btn.addEventListener('click', handleRefresh);

  updateWidget(false);
  setInterval(function() { updateWidget(false); }, 15000);
})();

/* ── Campus Mood Ring ── */

(function() {
  var RUB_TODAY_KEY = 'montereyfog-rub-today';

  var MOODS = [
    // ── Weather moods ──
    { id: 'fogLost',     emoji: '🌫️', label: 'Lost in the Fog',        desc: 'You\'ve been wandering Lot B for 20 minutes. This is your life now.',              color: '#8dabcf', vibe: 'disoriented',  vibePct: 25 },
    { id: 'frozen',      emoji: '🥶', label: 'Brain Fog (Literally)',   desc: 'It\'s cold AND foggy. Your thoughts have condensation on them.',                    color: '#6b8aaa', vibe: 'numb',         vibePct: 18 },
    { id: 'sunBlind',    emoji: '🌤️', label: 'Sun-Blind',              desc: 'Rare celestial event. No one knows how to act. The fog will return.',               color: '#e0b457', vibe: 'confused',     vibePct: 40 },
    { id: 'melting',     emoji: '🥵', label: 'Melting',                 desc: 'The sun is out AND it\'s warm. This is not Monterey. Something is wrong.',          color: '#d4873a', vibe: 'overheated',   vibePct: 22 },
    { id: 'melancholy',  emoji: '☁️', label: 'Marine Layer Melancholy', desc: 'The sky is a grey blanket and so is your motivation.',                              color: '#7a8a9a', vibe: 'grey',         vibePct: 30 },
    { id: 'damp',        emoji: '💧', label: 'Damp',                    desc: 'Not actively raining but the air is thick enough to drink. Welcome to coastal life.', color: '#6b9fb5', vibe: 'moist',        vibePct: 28 },
    { id: 'dampened',    emoji: '🌧️', label: 'Dampened Spirits',       desc: 'The marine layer has reached your soul. Everything is slightly wet — including your will to go to class.', color: '#5b7a9e', vibe: 'waterlogged', vibePct: 20 },
    { id: 'dread',       emoji: '⛈️', label: 'Existential Dread',      desc: 'The weather has become sentient and it is angry. Your umbrella cannot save you.',     color: '#4a3a5a', vibe: 'apocalyptic',  vibePct: 10 },
    { id: 'snowDay',     emoji: '❄️', label: 'Snow Day???',            desc: 'It\'s snowing in Monterey. The campus has shut down. Nobody owns a coat. Chaos.',     color: '#a0c4e8', vibe: 'unprepared',   vibePct: 45 },
    { id: 'windBlown',   emoji: '💨', label: 'Wind-Blown',             desc: 'The marine layer has become sentient and aggressive. Hold onto your hat. And your dignity.', color: '#8a9aaa', vibe: 'battered',     vibePct: 20 },
    // ── Time / daily life moods ──
    { id: 'groggy',      emoji: '😩', label: 'Groggy',                 desc: 'Your 8am is in 10 minutes. You are 20 minutes away. The fog is laughing at you.',    color: '#8a7a8a', vibe: 'regretful',    vibePct: 15 },
    { id: 'caffeinated', emoji: '☕',  label: 'Caffeinated',            desc: 'The Eatery coffee has kicked in. You are vibrating at a frequency unknown to science.', color: '#689466', vibe: 'buzzing',      vibePct: 85 },
    { id: 'hangry',      emoji: '🍽️', label: 'Hangry',                 desc: 'The Eatery closed at 8pm. You are now a feral otter foraging for snacks in the fog.', color: '#e88a40', vibe: 'feral',        vibePct: 12 },
    { id: 'sleepy',      emoji: '😴', label: 'Sleepy',                 desc: 'Campus shuts down at 10:30pm. So do you. It\'s a lifestyle.',                       color: '#7a7a9a', vibe: 'nap-adjacent', vibePct: 22 },
    { id: 'weekendVibes',emoji: '🎉', label: 'Weekend Mode',           desc: 'It\'s the weekend. You could go outside. You won\'t. But you could.',                color: '#c9a84c', vibe: 'free',         vibePct: 70 },
    // ── Campus-life moods ──
    { id: 'parking',     emoji: '🅿️', label: 'Parking Lot Rage',      desc: 'The $588 permit does not include peace of mind. Lot B is full. Again. You\'re now on Lot 59. RIP.', color: '#dc3545', vibe: 'fuming',       vibePct: 15 },
    { id: 'nostalgic',   emoji: '🥹', label: 'Nostalgic',              desc: 'The fog reminds you of home. Or maybe that\'s just the mold in Yarrow Hall. Either way, you have feelings.', color: '#c9a84c', vibe: 'sentimental', vibePct: 55 },
    { id: 'studious',    emoji: '📚', label: 'Studious',               desc: 'The library is calling. You are ignoring it. But the guilt is almost as productive as studying.', color: '#6b92b6', vibe: 'focused-adjacent', vibePct: 60 },
    { id: 'houseless',   emoji: '🏠', label: 'Houseless',              desc: 'The housing waitlist has become a personality trait. You are 300th in line and climbing.', color: '#e88a40', vibe: 'camping',      vibePct: 18 },
    { id: 'lucky',       emoji: '🦦', label: 'Otter-Blessed',          desc: 'You rubbed the statue\'s nose. The universe owes you one. Collect at will. (Results not guaranteed.)', color: '#c9a84c', vibe: 'blessed',      vibePct: 90 },
    { id: 'procrastinate',emoji: '⏰', label: 'Procrastinating',        desc: 'You have 3 assignments due. You\'re reading a campus mood ring. Priorities intact.',  color: '#9a8a6a', vibe: 'avoidant',     vibePct: 33 },
    { id: 'conspiring',  emoji: '🕵️', label: 'Conspiring',             desc: 'The fog is definitely a government experiment. The Eatery\'s 8 concepts are ONE concept in a trench coat.', color: '#8a6a9a', vibe: 'suspicious',   vibePct: 28 }
  ];

  var lastMoodId = null;
  var sessionRand = Math.random();

  function getWeather() {
    var w = window._campusWeather;
    if (w && typeof w.code === 'number') return w;
    return null;
  }

  function classifyWeather(w) {
    if (!w) return null;
    var c = w.code, t = w.temp, h = w.humidity, ws = w.wind || 0;

    // Fog
    if (c === 45 || c === 48) {
      if (t < 8) return 'frozen';
      return 'fogLost';
    }
    // Clear
    if (c === 0) {
      if (t >= 22) return 'melting';
      return 'sunBlind';
    }
    // Partly cloudy / overcast
    if (c >= 1 && c <= 3) return 'melancholy';
    // Drizzle
    if (c >= 51 && c <= 57) return 'damp';
    // Rain
    if ((c >= 61 && c <= 67) || (c >= 80 && c <= 82)) return 'dampened';
    // Snow
    if (c >= 71 && c <= 77) return 'snowDay';
    // Thunderstorm / hail
    if (c >= 95 && c <= 99) return 'dread';

    // No direct weather match — check humidity
    if (h > 90 && t < 16) return 'damp';
    if (h > 80 && t < 16) return 'fogLost';

    // High wind
    if (ws > 30) return 'windBlown';

    return null;
  }

  function hasRubbedToday() {
    return typeof rubCount !== 'undefined' && rubCount > 0;
  }

  function pickMood() {
    var hour = new Date().getHours();
    var day = new Date().getDay();
    var isWeekend = day === 0 || day === 6;
    var rubbed = hasRubbedToday();

    // Seed changes every 6 hours so mood has some consistency
    var daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 6));
    var rand = Math.abs(((daySeed * 13 + 7) % 1000) / 1000);
    var combined = (rand + sessionRand * 0.3) % 1;

    // 1. Weather takes priority
    var weather = getWeather();
    var weatherMood = classifyWeather(weather);
    if (weatherMood) return weatherMood;

    // 2. Weekend override (only if weather is neutral)
    if (isWeekend && hour >= 9 && hour <= 21) {
      if (combined < 0.6) return 'weekendVibes';
    }

    // 3. Time of day
    if (hour < 6 || hour >= 23) return 'sleepy';
    if (hour >= 6 && hour <= 8) return 'groggy';

    if (hour >= 9 && hour <= 11) {
      if (isWeekend && combined < 0.5) return 'weekendVibes';
      return combined < 0.55 ? 'caffeinated' : 'studious';
    }

    if (hour >= 12 && hour <= 13) {
      if (combined < 0.45) return 'hangry';
      if (combined < 0.75) return 'studious';
      return 'nostalgic';
    }

    if (hour >= 14 && hour <= 16) {
      if (combined < 0.25) return 'parking';
      if (combined < 0.45) return 'procrastinate';
      if (combined < 0.65) return 'studious';
      if (combined < 0.85) return 'nostalgic';
      return 'conspiring';
    }

    if (hour >= 17 && hour <= 19) {
      if (combined < 0.35) return 'hangry';
      if (combined < 0.55) return 'caffeinated';
      if (combined < 0.75) return 'studious';
      return 'nostalgic';
    }

    if (hour >= 20 && hour <= 22) {
      if (combined < 0.4) return 'studious';
      if (combined < 0.7) return 'sleepy';
      if (combined < 0.85) return 'nostalgic';
      return 'conspiring';
    }

    // 4. Fallback random pool
    var fallbacks = ['studious', 'nostalgic', 'parking', 'houseless', 'procrastinate', 'conspiring', 'sleepy', 'caffeinated'];
    if (rubbed && combined < 0.4) return 'lucky';
    return fallbacks[Math.floor(combined * fallbacks.length)];
  }

  function getMoodById(id) {
    for (var i = 0; i < MOODS.length; i++) {
      if (MOODS[i].id === id) return MOODS[i];
    }
    return MOODS[0];
  }

  function injectWidget() {
    var existing = document.getElementById('moodRingCard');
    if (existing) return existing;

    var sidebars = document.querySelectorAll('.sidebar');
    if (!sidebars.length) return null;

    var card = document.createElement('div');
    card.id = 'moodRingCard';
    card.className = 'card mood-ring-card';
    card.innerHTML =
      '<div class="mood-ring-header">🎭 Campus Mood Ring</div>' +
      '<div class="mood-ring-body">' +
        '<div class="mood-ring-circle-wrap">' +
          '<div class="mood-ring-circle" id="moodCircle">' +
            '<span class="mood-ring-emoji" id="moodEmoji">🌫️</span>' +
          '</div>' +
          '<div class="mood-ring-ring mood-ring-pulse" id="moodRing"></div>' +
        '</div>' +
        '<div class="mood-ring-label" id="moodLabel">Loading...</div>' +
        '<div class="mood-ring-desc" id="moodDesc"></div>' +
        '<div class="mood-ring-vibe">' +
          '<span>Vibe:</span>' +
          '<div class="mood-ring-vibe-bar">' +
            '<div class="mood-ring-vibe-fill" id="moodVibeFill" style="width:50%"></div>' +
          '</div>' +
          '<span id="moodVibeLabel">ok</span>' +
        '</div>' +
        '<div class="mood-ring-footer" id="moodFooter"></div>' +
      '</div>';

    var sidebar = sidebars[0];
    sidebar.insertBefore(card, sidebar.firstChild);
    return card;
  }

  function updateMoodRing() {
    var card = document.getElementById('moodRingCard') || injectWidget();
    if (!card) return;

    var moodId = pickMood();
    var mood = getMoodById(moodId);
    if (!mood) return;

    var emojiEl = document.getElementById('moodEmoji');
    var labelEl = document.getElementById('moodLabel');
    var descEl = document.getElementById('moodDesc');
    var vibeFill = document.getElementById('moodVibeFill');
    var vibeLabel = document.getElementById('moodVibeLabel');
    var footer = document.getElementById('moodFooter');
    var circle = document.getElementById('moodCircle');
    var ring = document.getElementById('moodRing');

    if (emojiEl) emojiEl.textContent = mood.emoji;
    if (labelEl) labelEl.textContent = mood.label;
    if (descEl) descEl.textContent = mood.desc;
    if (vibeFill) {
      vibeFill.style.width = mood.vibePct + '%';
      vibeFill.style.background = mood.color;
    }
    if (vibeLabel) vibeLabel.textContent = mood.vibe;
    if (circle) {
      circle.style.background = mood.color + '22';
      circle.style.boxShadow = '0 0 20px ' + mood.color + '33';
    }
    if (ring) ring.style.borderColor = mood.color;
    if (footer) {
      var now = new Date();
      var time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      footer.textContent = '↻ Mood checked at ' + time;
    }

    if (moodId !== lastMoodId) {
      lastMoodId = moodId;
      var wrap = card.querySelector('.mood-ring-body');
      if (wrap) {
        wrap.classList.remove('mood-ring-change');
        void wrap.offsetWidth;
        wrap.classList.add('mood-ring-change');
      }
    }
  }

  window.campusMoodRefresh = updateMoodRing;

  if (document.querySelector('.sidebar')) {
    updateMoodRing();
  }
})();
