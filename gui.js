javascript:(function () {
  const categories = {};

  const colors = [
    { name: "Red", primary: "#ff4444aa", toggled: "#660000", hover: "#ff6666" },
    { name: "Orange", primary: "#ff8800", toggled: "#994d00", hover: "#ffb74d" },
    { name: "Yellow", primary: "#ffeb3b", toggled: "#bfa600", hover: "#fff176" },
    { name: "Light Green", primary: "#8bc34a", toggled: "#4d751f", hover: "#aed581" },
    { name: "Green", primary: "#4caf50", toggled: "#2e7d32", hover: "#81c784" },
    { name: "Dark Green", primary: "#2e7d32", toggled: "#1b4d1b", hover: "#4caf50" },
    { name: "Light Blue", primary: "#03a9f4", toggled: "#01579b", hover: "#4fc3f7" },
    { name: "Blue", primary: "#2196f3", toggled: "#0d47a1", hover: "#64b5f6" },
    { name: "Dark Blue", primary: "#1565c0", toggled: "#0b3c75", hover: "#5e92f3" },
    { name: "Purple", primary: "#9c27b0", toggled: "#4a0072", hover: "#ba68c8" },
    { name: "Magenta", primary: "#e91e63", toggled: "#880e4f", hover: "#f06292" },
    { name: "Beige", primary: "#f5f5dc", toggled: "#9e9e85", hover: "#fafafa" },
    { name: "White", primary: "#ffffff", toggled: "#cccccc", hover: "#f0f0f0" },
    { name: "Gray", primary: "#9e9e9e", toggled: "#616161", hover: "#bdbdbd" },
  ];

  function loadTheme() {
    const saved = localStorage.getItem("customMenuTheme");
    return saved ? JSON.parse(saved) : colors[0];
  }
  function saveTheme(theme) {
    localStorage.setItem("customMenuTheme", JSON.stringify(theme));
  }
  function applyTheme(theme) {
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--toggled", theme.toggled);
    document.documentElement.style.setProperty("--hover", theme.hover);
  }
  function enableAntiBan() {
  if (!originalFetchCall && window.fetch && window.fetch.call) {
    originalFetchCall = window.fetch.call;
  }

  if (!originalFetchCall) return;

  window.fetch.call = function () {
    if (!arguments[1].includes("s.blooket.com/rc")) {
      return originalFetchCall.apply(this, arguments);
    }
    return new Promise(() => {}); 
  };
}

function disableAntiBan() {
  if (originalFetchCall) {
    window.fetch.call = originalFetchCall;
  }
}

function toggleAntiBan(stateasdasdasd) {
  if (stateasdasdasd) {
    disableAntiBan();
  } else {
    enableAntiBan();
  }
}

if (window.__tripleGoldPrize) return;

  const store = {
    enabled: false,
    originalChoosePrize: null,
  };

  function findReactNode(root = document.querySelector("body>div")) {
    while (root) {
      const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
      if (node) return node;
      root = root.querySelector(":scope>div");
    }
    return null;
  }

  window.__tripleGoldPrize = { enable, disable, toggle, _state: store };

  function enable() {
    if (store.enabled) return;
    const stateNode = findReactNode();
    if (!stateNode || typeof stateNode.choosePrize !== "function") {
      return;
    }

    store.originalChoosePrize = stateNode.choosePrize;

    const triplePrize = {
      type: "multiply",
      val: 3,
      text: "Triple Gold!",
      blook: "Unicorn"
    };

    stateNode.choosePrize = function (i) {
      if (this.state?.choices) {
        this.state.choices[i] = triplePrize;
      }
      store.originalChoosePrize.call(this, i);
    };

    if (stateNode.state?.gold === 0) {
      stateNode.setState({ gold: 100, gold2: 100 });
    }

    store.enabled = true;
  }

  function disable() {
    if (!store.enabled) return;
    const stateNode = findReactNode();
    if (stateNode && store.originalChoosePrize) {
      stateNode.choosePrize = store.originalChoosePrize;
    }
    store.originalChoosePrize = null;
    store.enabled = false;
  }

  function toggle(val) {
    if (typeof val === "boolean") {
      val ? enable() : disable();
    } else {
      store.enabled ? disable() : enable();
    }
  }

  function toggleRockESP(state) {
    function findReactNode(root = document.querySelector("body>div")) {
        while (root) {
            const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
            if (node) return node;
            root = root.querySelector(":scope>div");
        }
        return null;
    }

    const stateNode = findReactNode();
    if (!stateNode) return;

    const rocks = document.querySelector('[class*="rockButton"]').parentElement.children;

    if (state) {
        function rand(e, t) {
            const s = [];
            while (s.length < t) {
                const i = Math.random();
                let r = 0;
                let g;
                for (let o = 0; o < e.length; o++) {
                    r += e[o].rate;
                    if (r >= i) {
                        g = e[o];
                        break;
                    }
                }
                if (g && !s.includes(g)) s.push(g);
            }
            return s;
        }

        const exps = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
        function getExpAscii(num) {
            let res = "";
            while (num > 0) {
                res = exps[num % 10] + res;
                num = Math.floor(num / 10);
            }
            return res;
        }

        function shortNum(value) {
            const reg = RegExp("[^a-zA-Z 0-9]+", "g");
            let newValue = value.toString();
            if (value >= 1000) {
                const suffixes = ["", "K", "M", "B", "T"];
                const suffixNum = Math.floor(Math.floor((Math.log(value) / Math.log(10)).toPrecision(14)) / 3);
                if (suffixNum < suffixes.length) {
                    let shortValue = "";
                    for (let precision = 3; precision >= 1; precision--) {
                        shortValue = parseFloat((suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(precision)).toString();
                        const dotLessShortValue = shortValue.replace(reg, "");
                        if (dotLessShortValue.length <= 3) break;
                    }
                    if (Number(shortValue) % 1 != 0) shortValue = Number(shortValue).toFixed(1);
                    newValue = shortValue + suffixes[suffixNum];
                } else {
                    let num = value;
                    let exp = 0;
                    while (num >= 100) {
                        num = Math.floor(num / 10);
                        exp += 1;
                    }
                    newValue = num / 10 + " × 10" + getExpAscii(exp + 1);
                }
            }
            return newValue;
        }

        if (!Array.prototype.every.call(rocks, element => element.querySelector('.rockESPOverlay'))) {
            stateNode.setState({
                choices: rand([
                    { type: "fossil", val: 10, rate: 0.1, blook: "Amber" },
                    { type: "fossil", val: 25, rate: 0.1, blook: "Dino Egg" },
                    { type: "fossil", val: 50, rate: 0.175, blook: "Dino Fossil" },
                    { type: "fossil", val: 75, rate: 0.175, blook: "Stegosaurus" },
                    { type: "fossil", val: 100, rate: 0.15, blook: "Velociraptor" },
                    { type: "fossil", val: 125, rate: 0.125, blook: "Brontosaurus" },
                    { type: "fossil", val: 250, rate: 0.075, blook: "Triceratops" },
                    { type: "fossil", val: 500, rate: 0.025, blook: "Tyrannosaurus Rex" },
                    { type: "mult", val: 1.5, rate: 0.05 },
                    { type: "mult", val: 2, rate: 0.025 }
                ], 3)
            }, () => {
                Array.prototype.forEach.call(rocks, (element, index) => {
                    const rock = stateNode.state.choices[index];
                    if (element.querySelector('.rockESPOverlay')) element.querySelector('.rockESPOverlay').remove();

                    const choice = document.createElement("div");
                    choice.className = "rockESPOverlay";
                    choice.style.color = "white";
                    choice.style.fontFamily = "Macondo";
                    choice.style.fontSize = "1em";
                    choice.style.display = "flex";
                    choice.style.justifyContent = "center";
                    choice.style.transform = "translateY(25px)";
                    choice.innerText = rock.type === "fossil"
                        ? `+${Math.round(rock.val * stateNode.state.fossilMult) > 99999999 ? shortNum(Math.round(rock.val * stateNode.state.fossilMult)) : Math.round(rock.val * stateNode.state.fossilMult)} Fossils`
                        : `x${rock.val} Fossils Per Excavation`;
                    element.append(choice);
                });
            });
        }

    } else {
        Array.prototype.forEach.call(rocks, (element) => {
            const overlay = element.querySelector('.rockESPOverlay');
            if (overlay) overlay.remove();
        });
    }
}


let everyAnswerCorrectInterval;

  function removeRandomNameMod() {
      let iframe = document.querySelector("iframe");
      if (!iframe) {
          iframe = document.createElement("iframe");
          iframe.style.display = "none";
          document.body.append(iframe);
      }

      if (window.fetch.call.toString() === 'function call() { [native code] }') {
          const call = window.fetch.call;
          window.fetch.call = function () {
              if (!arguments[1].includes("s.blooket.com/rc")) {
                  return call.apply(this, arguments);
              }
          };
      }

      const reactRoot = (function findReact(r = document.querySelector("body>div")) {
          return Object.values(r)[1]?.children?.[0]?._owner?.stateNode ? r : findReact(r.querySelector(":scope>div"));
      })();

      const node = Object.values(reactRoot)[1].children[0]._owner.stateNode;
      node.setState({ isRandom: false, client: { name: "" } });

      document.querySelector('[class*="nameInput"]')?.focus();
  }

  function getQuestionsFiber() {
    function getFiber(el) {
      for (const k in el) {
        if (k.startsWith("__reactFiber$") || k.startsWith("__reactInternalInstance$")) {
          return el[k];
        }
      }
      return null;
    }

    function crawlFiber(f, depth = 0) {
      if (!f || depth > 50) return null;
      const props = f.memoizedProps;
      if (props?.questions && Array.isArray(props.questions)) {
        return f;
      }
      return crawlFiber(f.child, depth + 1) || crawlFiber(f.sibling, depth);
    }

    const rootEls = [document.querySelector("#app"), document.querySelector("#root"), document.body];
    for (const el of rootEls) {
      const f = getFiber(el);
      if (f) {
        const found = crawlFiber(f);
        if (found) return found;
      }
    }
    return null;
  }

  function setAllAnswersCorrect(state) {
    if (!state) return;
    const fiber = getQuestionsFiber();
    if (!fiber) return;

    const props = fiber.memoizedProps;
    if (!props.questions) return;

    props.questions.forEach(q => {
      if (q.answers) {
        q.correctAnswers = [...q.answers];
      }
    });

    console.log("✔ All answers marked correct:", props.questions);
  }

  async function claimDailyRewardsAndSpoofFactoryStats() {
    if (!window.location.href.includes("play.blooket.com")) {
        alert("This cheat only works on play.blooket.com, opening a new tab.");
        window.open("https://play.blooket.com/");
        return;
    }

    const gameIds = [
        "60101da869e8c70013913b59", "625db660c6842334835cb4c6", "60268f8861bd520016eae038",
        "611e6c804abdf900668699e3", "60ba5ff6077eb600221b7145", "642467af9b704783215c1f1b",
        "605bd360e35779001bf57c5e", "6234cc7add097ff1c9cff3bd", "600b1491d42a140004d5215a",
        "5db75fa3f1fa190017b61c0c", "5fac96fe2ca0da00042b018f", "600b14d8d42a140004d52165",
        "5f88953cdb209e00046522c7", "600b153ad42a140004d52172", "5fe260e72a505b00040e2a11",
        "5fe3d085a529560004cd3076", "5f5fc017aee59500041a1456", "608b0a5863c4f2001eed43f4",
        "5fad491512c8620004918ace", "5fc91a9b4ea2e200046bd49a", "5c5d06a7deebc70017245da7",
        "5ff767051b68750004a6fd21", "5fdcacc85d465a0004b021b9", "5fb7eea20bd44300045ba495"
    ];
    const gameId = gameIds[Math.floor(Math.random() * gameIds.length)];
    const rand = (l, h) => Math.floor(Math.random() * (h - l + 1)) + l;

    try {
        const { t } = await fetch("https://play.blooket.com/api/playersessions/solo", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ gameMode: "Factory", questionSetId: gameId })
        }).then(res => res.json());

        await fetch("https://play.blooket.com/api/playersessions/landings", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ t })
        });

        await fetch(`https://play.blooket.com/api/playersessions/questions?t=${t}`, { credentials: "include" });
        await fetch(`https://play.blooket.com/api/gamequestionsets?gameId=${gameId}`, { credentials: "include" });

        await fetch("https://play.blooket.com/api/users/factorystats", {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({
                t,
                place: 1,
                cash: rand(10000000, 100000000),
                playersDefeated: 0,
                correctAnswers: rand(500, 2000),
                upgrades: rand(250, 750),
                blookUsed: "Chick",
                nameUsed: "You",
                mode: "Time-Solo"
            })
        });

        const reward = await fetch("https://play.blooket.com/api/users/add-rewards", {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify({ t, addedTokens: 500, addedXp: 300 })
        }).then(res => res.json());

        alert(`Added max tokens and xp, and got ${reward.dailyReward} daily wheel tokens!`);
    } catch (err) {
    }
}


  function triggerFishingFrenzy() {
      const findReactNode = (root = document.querySelector("body>div")) => {
          while (root) {
              const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
              if (node) return node;
              root = root.querySelector(":scope>div");
          }
          return null;
      };

      const stateNode = findReactNode();
      if (!stateNode || !stateNode.props?.liveGameController || !stateNode.props?.client) return;

      stateNode.props.liveGameController.setVal({
          path: `c/${stateNode.props.client.name}`,
          val: {
              b: stateNode.props.client.blook,
              w: stateNode.state.weight,
              f: "Frenzy",
              s: true
          }
      });
  }

  function sendFishingDistraction() {
      const findReactNode = (root = document.querySelector("body>div")) => {
          while (root) {
              const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
              if (node) return node;
              root = root.querySelector(":scope>div");
          }
          return null;
      };

      const stateNode = findReactNode();
      if (!stateNode || !stateNode.props?.liveGameController || !stateNode.props?.client) return;

      const distractions = [
          "Crab", "Jellyfish", "Frog", "Pufferfish", "Octopus",
          "Narwhal", "Megalodon", "Blobfish", "Baby Shark"
      ];
      const chosen = distractions[Math.floor(Math.random() * distractions.length)];

      stateNode.safe = true;
      stateNode.props.liveGameController.setVal({
          path: `c/${stateNode.props.client.name}`,
          val: {
              b: stateNode.props.client.blook,
              w: stateNode.state.weight,
              f: chosen,
              s: true
          }
      });
  }

  let fishingDistractionInterval;
  let originalParty = null;

  function removeFishingDistraction(state2) {
      const findReactNode = (root = document.querySelector("body>div")) => {
          while (root) {
              const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
              if (node) return node;
              root = root.querySelector(":scope>div");
          }
          return null;
      };

      const disableDistraction = () => {
          const stateNode = findReactNode();
          if (!stateNode) return;

          if (originalParty === null) {
              originalParty = stateNode.state?.party || "fishing";
          }

          stateNode.setState({ party: "" });
      };

      if (state2) {
          disableDistraction();
          fishingDistractionInterval = setInterval(disableDistraction, 500);
      } else {
          clearInterval(fishingDistractionInterval);
          const stateNode = findReactNode();
          if (stateNode && originalParty !== null) {
              stateNode.setState({ party: originalParty });
          }
          originalParty = null;
      }
  }

  function setLureLevelWithPrompt() {
      const findReactNode = (root = document.querySelector("body>div")) => {
          while (root) {
              const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
              if (node) return node;
              root = root.querySelector(":scope>div");
          }
          return null;
      };

      const stateNode = findReactNode();
      if (!stateNode) return;

      const iframe = document.createElement("iframe");
      document.body.append(iframe);
      const prompt = iframe.contentWindow.prompt.bind(window);
      iframe.remove();

      const input = prompt("What would you like to set your lure to? (1 - 5)");
      const clamped = Math.max(Math.min((parseInt(input) || 0) - 1, 4), 0);
      stateNode.setState({ lure: clamped });
  }

  function stockCafeFoods() {
      if (window.location.pathname !== "/cafe") {
          alert("This can't be run in the shop");
          return;
      }

      const findReactNode = (root = document.querySelector("body>div")) => {
          while (root) {
              const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
              if (node) return node;
              root = root.querySelector(":scope>div");
          }
          return null;
      };

      const stateNode = findReactNode();
      if (!stateNode || !Array.isArray(stateNode.state?.foods)) return;

      stateNode.setState({
          foods: stateNode.state.foods.map(food => ({
              ...food,
              stock: 99,
              level: 5
          }))
      });
  }

  function removeCafeCustomers() {
      const findReactNode = (root = document.querySelector("body>div")) => {
          while (root) {
              const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
              if (node) return node;
              root = root.querySelector(":scope>div");
          }
          return null;
      };

      const stateNode = findReactNode();
      if (!stateNode || !Array.isArray(stateNode.state?.customers)) return;

      stateNode.state.customers.forEach((customer, i) => {
          if (customer.blook) {
              setTimeout(() => {
                  stateNode.removeCustomer(i, true);
              }, i * 250);
          }
      });
  }

  function maxCafeShopItems() {
      if (window.location.pathname !== "/cafe/shop") {
          alert("This can only be run in the shop");
          return;
      }

      const findReactNode = (root = document.querySelector("body>div")) => {
          while (root) {
              const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
              if (node) return node;
              root = root.querySelector(":scope>div");
          }
          return null;
      };

      const stateNode = findReactNode();
      if (!stateNode || !stateNode.state?.items) return;

      const updatedItems = Object.keys(stateNode.state.items).reduce((obj, item) => {
          obj[item] = 5;
          return obj;
      }, {});

      stateNode.setState({ items: updatedItems });
  }

  function setCryptoPasswordWithPrompt() {
      const findReactNode = (root = document.querySelector("body>div")) => {
          while (root) {
              const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
              if (node) return node;
              root = root.querySelector(":scope>div");
          }
          return null;
      };

      const iframe = document.createElement("iframe");
      document.body.append(iframe);
      const prompt = iframe.contentWindow.prompt.bind(window);
      iframe.remove();

      const password = prompt("What do you want to set your password to?");
      if (!password) return;

      const stateNode = findReactNode();
      if (!stateNode || !stateNode.props?.liveGameController || !stateNode.props?.client) return;

      stateNode.setState({ password });
      stateNode.props.liveGameController.setVal({
          path: `c/${stateNode.props.client.name}/p`,
          val: password
      });
  }

  function stealCryptoFromPlayer() {
      const findReactNode = (root = document.querySelector("body>div")) => {
          while (root) {
              const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
              if (node) return node;
              root = root.querySelector(":scope>div");
          }
          return null;
      };

      const iframe = document.createElement("iframe");
      document.body.append(iframe);
      const prompt = iframe.contentWindow.prompt.bind(window);
      iframe.remove();

      const target = prompt("Who's crypto would you like to steal?");
      if (!target) return;

      const stateNode = findReactNode();
      if (!stateNode || !stateNode.props?.liveGameController || !stateNode.props?.client) return;

      stateNode.props.liveGameController.getDatabaseVal("c", (players) => {
          if (!players) return;

          const entry = Object.entries(players).find(([name]) => name.toLowerCase() === target.toLowerCase());
          if (!entry) return;

          const [playerName, playerData] = entry;
          const stolenAmount = playerData.cr;

          const newCrypto = stateNode.state.crypto + stolenAmount;
          stateNode.setState({
              crypto: newCrypto,
              crypto2: newCrypto
          });

          stateNode.props.liveGameController.setVal({
              path: `c/${stateNode.props.client.name}`,
              val: {
                  b: stateNode.props.client.blook,
                  p: stateNode.state.password,
                  cr: newCrypto,
                  tat: `${playerName}:${stolenAmount}`
              }
          });
      });
  }

  function swapGoldWithPlayer() {
      const findReactNode = (root = document.querySelector("body>div")) => {
          while (root) {
              const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
              if (node) return node;
              root = root.querySelector(":scope>div");
          }
          return null;
      };

      const iframe = document.createElement("iframe");
      document.body.append(iframe);
      const prompt = iframe.contentWindow.prompt.bind(window);
      iframe.remove();

      const target = prompt("Who's gold would you like to swap with? (Case sensitive)");
      if (!target) return;

      const stateNode = findReactNode();
      if (!stateNode || !stateNode.props?.liveGameController || !stateNode.props?.client) return;

      stateNode.props.liveGameController.getDatabaseVal("c", (players) => {
          if (!players || !players[target]) return;

          const targetGold = players[target].g || 0;
          const currentGold = stateNode.state.gold || 0;

          stateNode.setState({ gold: targetGold, gold2: targetGold });

          stateNode.props.liveGameController.setVal({
              path: `c/${stateNode.props.client.name}`,
              val: {
                  b: stateNode.props.client.blook,
                  tat: `${target}:swap:${currentGold}`,
                  g: targetGold
              }
          });
      });
  }

  function resetPlayerGold() {
    const findReactNode = (root = document.querySelector("body>div")) => {
        while (root) {
            const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
            if (node) return node;
            root = root.querySelector(":scope>div");
        }
        return null;
    };

    const iframe = document.createElement("iframe");
    document.body.append(iframe);
    const prompt = iframe.contentWindow.prompt.bind(window);
    iframe.remove();

    const target = prompt("Who's gold would you like to reset? (Case sensitive)");
    if (!target) return;

    const stateNode = findReactNode();
    if (!stateNode || !stateNode.props?.liveGameController || !stateNode.props?.client) return;

    stateNode.props.liveGameController.setVal({
        path: `c/${stateNode.props.client.name}/tat`,
        val: `${target}:swap:0`
    });
}

function setPlayerGold() {
    const findReactNode = (root = document.querySelector("body>div")) => {
        while (root) {
            const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
            if (node) return node;
            root = root.querySelector(":scope>div");
        }
        return null;
    };

    const iframe = document.createElement("iframe");
    document.body.append(iframe);
    const prompt = iframe.contentWindow.prompt.bind(window);
    iframe.remove();

    const target = prompt("Who's gold would you like to set? (Case sensitive)");
    const amount = parseInt(prompt("How much gold would you like to set?")) || 0;
    if (!target) return;

    const stateNode = findReactNode();
    if (!stateNode || !stateNode.props?.liveGameController || !stateNode.props?.client) return;

    stateNode.props.liveGameController.setVal({
        path: `c/${stateNode.props.client.name}/tat`,
        val: `${target}:swap:${amount}`
    });
}


  let cryptoESPInterval;

  function revealCryptoChoiceESP(state67) {
      const findReactNode = (root = document.querySelector("body>div")) => {
          while (root) {
              const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
              if (node) return node;
              root = root.querySelector(":scope>div");
          }
          return null;
      };

      const addLabel = () => {
          const stateNode = findReactNode();
          if (!stateNode || !Array.isArray(stateNode.state?.choices)) return;

          const feedbackContainer = document.querySelector('[class*=feedbackContainer]');
          if (!feedbackContainer) return;

          if (feedbackContainer.querySelector(".crypto-esp-label")) return;

          const label = document.createElement("div");
          label.className = "crypto-esp-label";
          label.innerText = stateNode.state.choices[0]?.text ?? "";
          label.style.color = "white";
          label.style.fontFamily = "Inconsolata,Helvetica,monospace,sans-serif";
          label.style.fontSize = "2em";
          label.style.display = "flex";
          label.style.justifyContent = "center";
          label.style.marginTop = "675px";

          feedbackContainer.append(label);
      };

      if (state67) {
          addLabel();
          cryptoESPInterval = setInterval(addLabel, 500);
      } else {
          clearInterval(cryptoESPInterval);
          document.querySelectorAll(".crypto-esp-label").forEach(el => el.remove());
      }
  }

  let chestAnswersInterval;

  function revealChestAnswers(state45) {
      const findReactNode = (root = document.querySelector("body>div")) => {
          while (root) {
              const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
              if (node) return node;
              root = root.querySelector(":scope>div");
          }
          return null;
      };

      const addLabels = () => {
          const stateNode = findReactNode();
          if (!stateNode || !Array.isArray(stateNode.state?.choices)) return;

          stateNode.state.choices.forEach(({ text }, index) => {
              const chest = document.querySelector(`div[class*='choice${index + 1}']`);
              if (!chest) return;

              if (chest.querySelector(".chest-answer-label")) return;

              const label = document.createElement("div");
              label.className = "chest-answer-label";
              label.innerText = text;
              label.style.color = "white";
              label.style.fontFamily = "Eczar";
              label.style.fontSize = "2em";
              label.style.display = "flex";
              label.style.justifyContent = "center";
              label.style.transform = "translateY(200px)";
              chest.append(label);
          });
      };

      if (state45) {
          addLabels();
          chestAnswersInterval = setInterval(addLabels, 500);
      } else {
          clearInterval(chestAnswersInterval);
          document.querySelectorAll(".chest-answer-label").forEach(el => el.remove());
      }
  }
  const originalAnswers = new WeakMap();

  function getFiberFromElement(el) {
    if (!el) return null;
    for (const k in el) {
      if (k.startsWith("__reactFiber$") || k.startsWith("__reactInternalInstance$") || k.startsWith("__reactContainer$")) {
        return el[k];
      }
    }
    return null;
  }

  function findQuestionsFiber(maxDepth = 2000) {
    const roots = [document.querySelector("#app"), document.querySelector("#root"), document.body].filter(Boolean);
    const visited = new Set();

    const looksLikeQArr = x => Array.isArray(x) && x.length > 0 && (Array.isArray(x[0].answers) || Array.isArray(x[0].correctAnswers));
    const looksLikeQObj = x => x && Array.isArray(x.answers);

    for (const rootEl of roots) {
      const start = getFiberFromElement(rootEl);
      if (!start) continue;
      const stack = [start];
      let depth = 0;
      while (stack.length && depth++ < maxDepth) {
        const f = stack.pop();
        if (!f || visited.has(f)) continue;
        visited.add(f);

        const P = f.memoizedProps || {};
        const S = f.memoizedState || {};
        const sn = f.stateNode || {};

        if (
          looksLikeQArr(P.questions) || looksLikeQArr(P.client?.questions) || looksLikeQObj(P.question) ||
          looksLikeQArr(S.questions) || looksLikeQArr(S.freeQuestions) || looksLikeQObj(S.question) ||
          looksLikeQArr(sn?.props?.questions) || looksLikeQObj(sn?.state?.question)
        ) {
          return f;
        }

        if (f.child) stack.push(f.child);
        if (f.sibling) stack.push(f.sibling);
      }
    }
    return null;
  }

  function nudgeRerender(fiber) {
    if (!fiber) return false;
    let p = fiber;
    while (p) {
      try {
        if (p.stateNode && typeof p.stateNode.forceUpdate === "function") {
          p.stateNode.forceUpdate();
          return true;
        }
        if (p.stateNode && typeof p.stateNode.setState === "function") {
          p.stateNode.setState({});
          return true;
        }
      } catch (e) {}
      p = p.return;
    }
    return false;
  }

  let _allCorrectRAF = null;

  function setAllAnswersCorrect(dsasdada) {
    if (dsasdada) {
      if (_allCorrectRAF) return;
      const tick = () => {
        try {
          const f = findQuestionsFiber();
          if (f) patchQuestionsInFiber(f);
        } catch (e) {}
        _allCorrectRAF = requestAnimationFrame(tick);
      };
      tick();
    } else {
      if (_allCorrectRAF) cancelAnimationFrame(_allCorrectRAF);
      _allCorrectRAF = null;
      restoreAllOriginals();
    }
  }

  function patchQuestionsInFiber(f) {
    const props = f.memoizedProps || {};
    const state = f.memoizedState || {};

    const patchArray = (arr) => {
      if (!Array.isArray(arr)) return;
      for (const q of arr) {
        if (!q || !Array.isArray(q.answers)) continue;
        if (!originalAnswers.has(q)) {
          originalAnswers.set(q, Array.isArray(q.correctAnswers) ? [...q.correctAnswers] : null);
        }
        q.correctAnswers = [...q.answers];
      }
    };

    patchArray(props.questions);
    patchArray(props.client?.questions);
    patchArray(state.questions);
    patchArray(state.freeQuestions);

    if (state.question && Array.isArray(state.question.answers)) {
      if (!originalAnswers.has(state.question)) {
        originalAnswers.set(state.question, Array.isArray(state.question.correctAnswers) ? [...state.question.correctAnswers] : null);
      }
      state.question.correctAnswers = [...state.question.answers];
    }

    if (props.question && Array.isArray(props.question.answers)) {
      if (!originalAnswers.has(props.question)) {
        originalAnswers.set(props.question, Array.isArray(props.question.correctAnswers) ? [...props.question.correctAnswers] : null);
      }
      props.question.correctAnswers = [...props.question.answers];
    }

    nudgeRerender(f);
  }

  function restoreAllOriginals() {
    for (const [q, orig] of originalAnswers.entries()) {
      if (!q || !Array.isArray(q.answers)) continue;
      if (orig) {
        q.correctAnswers = [...orig];
      } else {
        delete q.correctAnswers;
      }
    }
    originalAnswers.clear();
  }

  let _autoAnswerRAF = null;
  let _lastQuestionId = null;

  function autoAnswer(aaaasdasd) {
    if (aaaasdasd) {
      if (_autoAnswerRAF) return;
      const tick = () => {
        try { doAutoAnswerOnce(); } catch(e) {}
        _autoAnswerRAF = requestAnimationFrame(tick);
      };
      tick();
    } else {
      if (_autoAnswerRAF) cancelAnimationFrame(_autoAnswerRAF);
      _autoAnswerRAF = null;
      _lastQuestionId = null;
    }
  }

  function getQuestionFromFiber(f) {
    const props = f.memoizedProps || {};
    const state = f.memoizedState || {};
    const sNode = f.stateNode || {};

    let q = props.question
      || (Array.isArray(props.questions) && props.questions[props.currentIndex || 0])
      || props.client?.question
      || state.question
      || (Array.isArray(state.freeQuestions) && state.freeQuestions[0])
      || sNode?.state?.question
      || null;
    return q;
  }

  function doAutoAnswerOnce() {
    const f = findQuestionsFiber();
    if (!f) return;
    const q = getQuestionFromFiber(f);
    if (!q || !Array.isArray(q.answers)) return;

    const qId = JSON.stringify({ answers: q.answers, correct: q.correctAnswers, qType: q.qType, text: q.text || q.id || "" });
    if (qId === _lastQuestionId) return;
    _lastQuestionId = qId;

    if (!Array.isArray(q.correctAnswers)) return;

    if (q.qType === "typing") {
      const inputEl = document.querySelector("input[type='text'], textarea");
      if (inputEl) {
        inputEl.value = q.answers[0];
        inputEl.dispatchEvent(new Event("input", { bubbles: true }));
        inputEl.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      }
      return;
    }

    let correctIndex = q.answers.findIndex(a => q.correctAnswers.includes(a));
    if (correctIndex >= 0) {
      const el = Array.from(document.querySelectorAll("[class*='answerContainer']")).at(correctIndex);
      if (el) el.click();
    }
  }

  window.__blooketHelpers = Object.assign(window.__blooketHelpers || {}, {
    setAllAnswersCorrect,
    autoAnswer
  });

  function restoreHighlights() {
    for (const [el, color] of originalStyles.entries()) {
      if (el) el.style.backgroundColor = color || "";
    }
    originalStyles.clear();
  }

  function toggleCorrectAnswers(state67890765) { 
    const t = T();

    if (state67890765) {
        for (let i = 0; i < t.freeQuestions.length; i++) {
            t.freeQuestions[i].correctAnswers = t.freeQuestions[i].answers;
            t.questions[i].correctAnswers = t.questions[i].answers;
            t.props.client.questions[i].correctAnswers = t.questions[i].answers;
        }
    } else {
        for (let i = 0; i < t.freeQuestions.length; i++) {
            t.freeQuestions[i].correctAnswers = [];
            t.questions[i].correctAnswers = [];
            t.props.client.questions[i].correctAnswers = [];
        }
    }

    try {
        t.forceUpdate();
    } catch {}
}

function freezeLeaderboard(hyeryhdfg) {
    if (hyeryhdfg) {
  const e = Object.values(function f(t = document.querySelector("#app")) {
    return Object.values(t)[1]?.children?.[0]?._owner.stateNode ? t : f(t.querySelector(":scope>div"));
  }())[1].children[0]._owner.stateNode;

  if (this.enabled) {
    this.enabled = false;
    clearInterval(this.data);
    this.data = null;
    e.props.liveGameController.removeVal(`c/${e.props.client.name}/tat`);
  } else {
    this.enabled = true;
    const tick = () => {
      e.props.liveGameController.setVal({
        path: `c/${e.props.client.name}/tat/Freeze`,
        val: "freeze"
      });
    };
    this.data = setInterval(tick, 25);
  }
    }
}

function crashHost(state98gtm) {
    if (state98gtm) {
  const e = Object.values(function f(t = document.querySelector("#app")) {
    return Object.values(t)[1]?.children?.[0]?._owner.stateNode
      ? t
      : f(t.querySelector(":scope>div"));
  }())[1].children[0]._owner.stateNode;

  if (this.enabled) {
    clearInterval(this.data);
    this.data = null;
    e.props.liveGameController.removeVal(`c/${e.props.client.name}/tat`);
  } else {
    const tick = () => {
      e.props.liveGameController.setVal({
        path: `c/${e.props.client.name}/tat/Freeze`,
        val: "freeze"
      });
    };
    this.data = setInterval(tick, 25);
  }
    }
}



  let highlightInterval;
    const originalColors = new Map();

    function highlightAnswers(state) {
        function runHighlight() {
            const react = (r = document.querySelector("body>div")) =>
                Object.values(r)[1]?.children?.[0]?._owner?.stateNode
                    ? r
                    : react(r.querySelector(":scope>div"));

            const { stateNode } = Object.values(react())[1].children[0]._owner;
            const Question = stateNode.state?.question || stateNode.props?.client?.question;
            if (!Question?.answers || !Question?.correctAnswers) return;

            const answerBoxes = document.querySelectorAll("[class*='answersHolder'] > div");
            answerBoxes.forEach((box, i) => {
                if (!originalColors.has(box)) {
                    originalColors.set(box, box.style.backgroundColor || "");
                }
                const ans = Question.answers[i];
                box.style.backgroundColor = Question.correctAnswers.includes(ans)
                    ? "rgb(0, 207, 119)"
                    : "rgb(189, 15, 38)";
            });
        }

        function clearHighlight() {
            for (const [box, color] of originalColors.entries()) {
                box.style.backgroundColor = color;
            }
            originalColors.clear();
        }

        if (state) {
            clearInterval(highlightInterval);
            runHighlight();
            highlightInterval = setInterval(runHighlight, 100);
        } else {
            clearInterval(highlightInterval);
            clearHighlight();
        }
    }

    window.highlightAnswers = highlightAnswers;

    if (window.__highlightESP) return;

  const state = {
    interval: null,
    originals: new Map(),
    enabled: false,
  };

  function findReactStateNode(root = document.querySelector("body>div")) {
    try {
      while (root) {
        const candidate = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
        if (candidate) return candidate;
        root = root.querySelector(":scope>div");
        if (!root) break;
      }
    } catch (e) {}
    return null;
  }

  function getQuestion(stateNode) {
    if (!stateNode) return null;
    return stateNode.state?.question
      || stateNode.props?.client?.question
      || stateNode.props?.question
      || null;
  }

  function locateAnswerElements(answers) {
    const results = new Array(answers.length).fill(null);

    let pool = [];
    const containers = document.querySelectorAll(
      "[class*='answersHolder'], [class*='AnswersHolder'], [class*='Answers'], [data-testid='answers'], [class*='answersContainer']"
    );
    if (containers.length) {
      containers.forEach(c => {
        if (c.children && c.children.length) pool.push(...Array.from(c.children));
        pool.push(...Array.from(c.querySelectorAll("*")));
      });
    } else {
      pool = Array.from(document.querySelectorAll(
        "[class*='answerContainer'], [class*='answer'], [class*='Answer'], button, [role='button']"
      ));
    }

    const norm = t => (t || "").toString().trim().replace(/\s+/g, " ");

    for (let i = 0; i < answers.length; i++) {
      const a = norm(answers[i]);
      const found = pool.find(el => norm(el.innerText) === a);
      if (found) results[i] = found;
    }
    for (let i = 0; i < answers.length; i++) {
      if (results[i]) continue;
      const a = norm(answers[i]).split("\n")[0];
      const found = pool.find(el => norm(el.innerText).includes(a));
      if (found) results[i] = found;
    }

    if (results.every(r => r === null)) {
      const holder = document.querySelector("[class*='answersHolder'], [class*='AnswersHolder']");
      if (holder && holder.children && holder.children.length >= answers.length) {
        for (let i = 0; i < answers.length; i++) {
          const child = holder.children[i];
          results[i] = child.querySelector("div, button, [role='button']") || child;
        }
      }
    }

    return results;
  }

  function applyHighlights() {
    const stateNode = findReactStateNode();
    const q = getQuestion(stateNode);
    if (!q || !Array.isArray(q.answers) || !Array.isArray(q.correctAnswers)) return;

    const answers = q.answers;
    const correct = q.correctAnswers;

    const elements = locateAnswerElements(answers);

    for (let i = 0; i < answers.length; i++) {
      const el = elements[i];
      if (!el) continue;

      if (!state.originals.has(el)) {
        state.originals.set(el, el.style.backgroundColor ?? "");
      }

      try {
        const isCorrect = correct.includes(answers[i]);
        el.style.backgroundColor = isCorrect ? "rgb(0, 207, 119)" : "rgb(189, 15, 38)";
      } catch (e) {  }
    }
  }

  function restoreAll() {
    for (const [el, orig] of state.originals.entries()) {
      try {
        el.style.backgroundColor = orig;
      } catch (e) {}
    }
    state.originals.clear();
  }

  function enable() {
    if (state.enabled) return;
    applyHighlights();
    state.interval = setInterval(applyHighlights, 100);
    state.enabled = true;
  }

  function disable() {
    if (!state.enabled) return;
    clearInterval(state.interval);
    state.interval = null;
    restoreAll();
    state.enabled = false;
  }

  function toggle(val) {
    if (typeof val === "boolean") {
      val ? enable() : disable();
    } else {
      state.enabled ? disable() : enable();
    }
  }

  window.__highlightESP = { enable, disable, toggle, _state: state };


function highlightanswersundetected(state) {
            if (!state) {
                document.querySelectorAll("[class*='answersHolder'] > * > div")
                    .forEach(el => el.style.backgroundColor = "");
                return;
            }

            const findReactNode = (root = document.querySelector("body>div")) => {
                while (root) {
                    const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
                    if (node) return node;
                    root = root.querySelector(":scope>div");
                }
                return null;
            };

            const stateNode = findReactNode();
            if (!stateNode) return;

            const Question = stateNode.state?.question || stateNode.props?.client?.question;
            if (!Question?.answers || !Question?.correctAnswers) return;

            Question.answers.forEach((answer, i) => {
                const isCorrect = Question.correctAnswers.includes(answer);
                const answerBox = document.querySelector(`[class*='answersHolder'] :nth-child(${i + 1}) > div`);
                if (answerBox) {
                    answerBox.style.backgroundColor = isCorrect ? "rgb(0, 207, 119)" : "rgb(189, 15, 38)";
                }
            });
        }


function toggleDinoNonCheating(state) {
    function findReactNode(root = document.querySelector("body>div")) {
        while (root) {
            const node = Object.values(root)[1]?.children?.[0]?._owner?.stateNode;
            if (node) return node;
            root = root.querySelector(":scope>div");
        }
        return null;
    }

    const stateNode = findReactNode();
    if (!stateNode) return;

    if (window.__dinoOriginalCheating === undefined) {
        window.__dinoOriginalCheating = stateNode.state?.isCheating ?? true;
    }

    if (state) {
        stateNode.setState({ isCheating: false });
        stateNode.props.liveGameController.setVal({
            path: `c/${stateNode.props.client.name}/ic`,
            val: false
        });
    } else {
        stateNode.setState({ isCheating: window.__dinoOriginalCheating });
        stateNode.props.liveGameController.setVal({
            path: `c/${stateNode.props.client.name}/ic`,
            val: window.__dinoOriginalCheating
        });

        delete window.__dinoOriginalCheating;
    }
}


function sendAdText() {
  const iframe = document.createElement("iframe");
  document.body.append(iframe);
  const prompt = iframe.contentWindow.prompt.bind(window);
  iframe.remove();

  const text = prompt("What text would you like to send to the leaderboard?") || "Stinky Butt";

  const stateNode = Object.values(function find(t = document.querySelector("body>div")) {
    return Object.values(t)[1]?.children?.[0]?._owner.stateNode
      ? t
      : find(t.querySelector(":scope>div"));
  }())[1].children[0]._owner.stateNode;

  const { props } = stateNode;

  const repeatedText = Array(5e3).fill(text).join(' ');

  props.client.blook = repeatedText;
  props.liveGameController.setVal({ path: `c/${props.client.name}}/b`, val: repeatedText });
  props.liveGameController.setVal({ path: `c/${props.client.name}/tat`, val: `${props.client.name}:${repeatedText}` });
}



  function unlockAllBlooks() {
      const lobby = window.location.pathname.startsWith("/play/lobby");
      const dashboard = !lobby && window.location.pathname.startsWith("/blooks");

      if (dashboard) {
          const key = "getfuckedbykarmalol";
          const originalHasOwn = Object.prototype.hasOwnProperty.call;

          const webpack = webpackChunk_N_E.push([
              [key],
              { [key]: () => {} },
              function (func) {
                  Object.prototype.hasOwnProperty.call = function () {
                      Object.defineProperty(arguments[0], key, { set: () => {}, configurable: true });
                      return (Object.prototype.hasOwnProperty.call = originalHasOwn).apply(this, arguments);
                  };
                  return func;
              },
          ]);

          const blookData = webpack(4927).nK;
          const blooksHook = Object.values(document.querySelector("[class*=BlooksWrapper_content]"))[0].return.memoizedState.next;
          const showBlooks = blooksHook.memoizedState;

          const seen = {};
          const userBlooks = [];
          const prices = {
              Uncommon: 5,
              Rare: 20,
              Epic: 75,
              Legendary: 200,
              Chroma: 300,
              Unique: 350,
              Mystical: 1000,
          };

          for (const data of blooksHook.next.memoizedState) {
              userBlooks.push(data);
              seen[data.blook] = true;
          }

          for (const blook in blookData) {
              const rarity = blookData[blook].rarity;
              if (rarity !== "Common" && !seen[blook]) {
                  userBlooks.push({
                      blook,
                      quantity: 1,
                      sellPrice: prices[rarity],
                  });
              }
          }

          blooksHook.next.queue.dispatch(userBlooks);
          blooksHook.queue.dispatch(!showBlooks);
          setTimeout(() => blooksHook.queue.dispatch(showBlooks), 1);
      }

      if (lobby) {
          const stateNode = Object.values(document.querySelector("#app>div>div"))[1].children[0]._owner.stateNode;
          stateNode.setState({ unlocks: { includes: () => true } });
      }
  }

  const style = document.createElement("style");
  style.textContent = `
    #customModContainer {
      position: fixed;
      top: 48%; /* slightly higher as requested */
      left: 50%;
      transform: translate(-50%, -50%) scale(1.2);
      background: #222;
      color: white;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      border-radius: 12px;
      width: 540px; /* widened slightly to form rectangle that fits both sidebar + content comfortably */
      height: 340px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 15px var(--primary, #ff0000aa);
      z-index: 9999999999;
      overflow: hidden;
      animation: fadeInScale 0.25s ease forwards;
      user-select: none;
    }
    #customModContainer.closing {
      animation: fadeOutScale 0.28s forwards;
    }
    #customModContainer.minimizing {
      animation: minimizeAnim 0.35s forwards;
    }
    #customModContainer.maximizing {
      animation: maximizeAnim 0.35s forwards;
    }
    #customModHeader {
      background: var(--primary, #ff4444aa);
      padding: 10px;
      font-size: 16px;
      font-weight: 700;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #222;
    }
    #customHeaderButtons button {
      background: none;
      border: none;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      color: #222;
      margin-left: 6px;
    }
    #customHeaderButtons button:hover {
      color: white;
    }
    #customMain {
      flex: 1;
      display: flex;
      overflow: hidden;
    }
    #customSidebar {
      background: #111;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      border-right: 2px solid var(--primary, #ff4444aa);
      width: 150px; /* widen to fit text comfortably */
      max-height: 100%;
      overflow-y: auto; 
      box-sizing: border-box;
    }
    #customSidebar button {
      background: var(--primary, #ff4444aa);
      border: none;
      color: #111;
      font-weight: 700;
      padding: 8px;
      border-radius: 8px;
      cursor: pointer;
      text-align: center;
      transition: background 0.2s, color 0.2s;
    }
    #customSidebar button.active {
      background: var(--toggled, #660000);
      color: white;
    }
    #customSidebar button:hover {
      background: var(--hover, #ff6666);
    }
    #customModContent {
      flex: 1;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow-y: auto;
      box-sizing: border-box;
    }
    .modButtonGroup {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    #customModContent button {
      background: var(--primary, #ff4444aa);
      border: none;
      color: #222;
      font-weight: 700;
      padding: 10px;
      border-radius: 10px;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      text-align: left;
    }
    #customModContent button:hover {
      background: var(--hover, #ff6666);
    }
    #customModContent button.toggle-active {
      background: var(--toggled, #660000);
      color: white;
    }
    #customModMinimized {
      position: fixed;
      top: 12px;              
      right: 12px;
      padding: 6px 10px;      
      background: #111;       
      color: white;
      display: none;
      flex-direction: row;    
      justify-content: center;
      align-items: center;
      gap: 8px;               
      border-radius: 10px;
      z-index: 9999999999;
      box-shadow: 0 0 8px rgba(0,0,0,0.6);
    }
    #customModMinimized button {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      padding: 2px 6px;
      transition: color 0.2s ease;
    }
    #customModMinimized button:hover {
      color: var(--hover, #ff6666);
    }
    #customSidebar, #customModContent {
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: #111;
}

#customSidebar::-webkit-scrollbar,
#customModContent::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  background-color: #111;
}

    @keyframes minimizeAnim {
      0%   { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
      100% { opacity: 0; transform: translate(200%, -200%) scale(0.3); }
    }
    @keyframes maximizeAnim {
      0%   { opacity: 0; transform: translate(200%, -200%) scale(0.3); }
      100% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
    }
    @keyframes fadeInScale {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(1.4); }
      100% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
    }
    @keyframes fadeOutScale {
      0% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(1.4); }
    }
  `;


  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "customModContainer";

  const header = document.createElement("div");
  header.id = "customModHeader";
  header.innerHTML = `
    <span>karma.lol</span>
    <div id="customHeaderButtons">
      <button id="customMinimizeBtn">−</button>
      <button id="customCloseBtn">×</button>
    </div>`;
    

  const mainWrapper = document.createElement("div");
  mainWrapper.id = "customMain";

  const sidebar = document.createElement("div");
  sidebar.id = "customSidebar";

  const content = document.createElement("div");
  content.id = "customModContent";

  mainWrapper.appendChild(sidebar);
  mainWrapper.appendChild(content);

  container.appendChild(header);
  container.appendChild(mainWrapper);
  document.body.appendChild(container);

  const minimizedBox = document.createElement("div");
  minimizedBox.id = "customModMinimized";
  minimizedBox.innerHTML = `
    <button id="customRestoreBtn">+</button>
    <button id="customMiniCloseBtn">×</button>
  `;
  document.body.appendChild(minimizedBox);
  window.__customModMenu = container;
window.__customMinimizedBox = minimizedBox;
window.__customModStyle = style;

  function createCategory(name, label) {
    if (!categories[name]) {
      categories[name] = { label: label || name, buttons: [] };
    }
    return categories[name];
  }

  function createButton(text, categoryName, method, options = {}) {
  const btn = document.createElement("button");
  btn.textContent = text;

  if (!categories[categoryName]) createCategory(categoryName);

  const ctx = { enabled: false, data: null };

  btn.addEventListener("click", () => {
    try {
      if (options.togglable) {
        if (typeof method === "function" && method.length > 0) {
          ctx.enabled = !ctx.enabled;
          btn.classList.toggle("toggle-active", ctx.enabled);
          method.call(ctx, ctx.enabled);
          btn.classList.toggle("toggle-active", !!ctx.enabled);
        } else {
          method.call(ctx);
          btn.classList.toggle("toggle-active", !!ctx.enabled);
        }
      } else {
        method.call(ctx);
      }
    } catch (e) {
      console.error(e);
    }
  });

  categories[categoryName].buttons.push(btn);
}



  const button = {
    add: (text) => {
      const obj = { text };
      obj.category = function (name) {
        obj._category = name;
        return obj;
      };
      Object.defineProperty(obj, "method", {
        set(fn) {
          createButton(obj.text, obj._category, fn, obj.options || {});
        },
      });
      obj.togglable = function () {
        obj.options = { togglable: true };
        return obj;
      };
      return obj;
    },
  };

  const category = {
    add: (label) => {
      const obj = { label };
      Object.defineProperty(obj, "category", {
        set(name) {
          createCategory(name, label);
        },
      });
      return obj;
    },
  };

const searchbar = {
  addtocategory: function (categoryName = "search") {
    const searchContainer = document.createElement("div");
    searchContainer.style.padding = "8px";
    searchContainer.style.display = "flex";
    searchContainer.style.flexDirection = "column";
    searchContainer.style.gap = "6px";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search...";
    searchInput.style.padding = "6px";
    searchInput.style.borderRadius = "6px";
    searchInput.style.border = "1px solid #444";
    searchInput.style.background = "#222";
    searchInput.style.color = "white";
    searchInput.style.outline = "none";

    const searchResults = document.createElement("div");
    searchResults.style.display = "flex";
    searchResults.style.flexDirection = "column";
    searchResults.style.gap = "6px";
    searchResults.style.maxHeight = "200px";
    searchResults.style.overflowY = "auto";

    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchResults);

    if (!categories[categoryName]) {
      categories[categoryName] = { label: categoryName, buttons: [] };
    }
    categories[categoryName].buttons.push(searchContainer);

    function getAllButtons() {
      return Object.keys(categories).flatMap(cat =>
        categories[cat].buttons.filter(btn => btn.tagName === "BUTTON")
      );
    }

    function renderSearchResults(query) {
  searchResults.innerHTML = "";
  if (!query) return;

  let allBtns = Object.keys(categories)
    .flatMap(cat => categories[cat].buttons.filter(btn => btn.tagName === "BUTTON"));

  allBtns.sort((a, b) => a.textContent.localeCompare(b.textContent));

  allBtns
    .filter(btn => btn.textContent.toLowerCase().includes(query.toLowerCase()))
    .forEach(btn => {
      searchResults.appendChild(btn);
    });
}

    searchInput.addEventListener("input", e => {
      renderSearchResults(e.target.value.trim());
    });
  }
};

  category.add("Search").category = "search";
  category.add("Global").category = "global";
  category.add("Fishing").category = "fishingfrenzy";
  category.add("Gold").category = "goldquest";
  category.add("Crypto").category = "cryptohack";
  category.add("Settings").category = "settings";

  button.add("Anti Ban").category("global").togglable().method = (stateasdasdasd) => toggleAntiBan(stateasdasdasd);
  button.add("Claim Daily Rewards").category("global").method = () => claimDailyRewardsAndSpoofFactoryStats();
  button.add("Remove Random Name").category("global").method = () => removeRandomNameMod();
  button.add("Unlock All Blooks").category("global").method = () => unlockAllBlooks();
  button.add("Frenzy").category("fishingfrenzy").method = () => triggerFishingFrenzy();
  button.add("Distraction").category("fishingfrenzy").method = () => sendFishingDistraction();
  button.add("Remove Distractions").category("fishingfrenzy").togglable().method = (state2) => removeFishingDistraction(state2);
  button.add("Set Fishing Lure").category("fishingfrenzy").method = () => setLureLevelWithPrompt();
  button.add("Crypto ESP").category("cryptohack").togglable().method = (state67) => revealCryptoChoiceESP(state67);
  button.add("Steal Crypto From Player").category("cryptohack").method = () => stealCryptoFromPlayer();
  button.add("Set Crypto Password").category("cryptohack").method = () => setCryptoPasswordWithPrompt();
  button.add("Chest ESP").category("goldquest").togglable().method = (state3) => revealChestAnswers(state3);
  button.add("Flood Leaderboard").category("goldquest").method = () => sendAdText();
  button.add("Reset Players Gold").category("goldquest").method = () => resetPlayerGold();
  button.add("Swap Gold").category("goldquest").method = () => swapGoldWithPlayer();
  button.add("Set Players Gold").category("goldquest").method = () => setPlayerGold();

  searchbar.addtocategory("search");

  let savedTheme = loadTheme();
  let currentColorIndex = colors.findIndex(c => c.primary === savedTheme.primary);
  if (currentColorIndex === -1) currentColorIndex = 0;

  const colorButton = document.createElement("button");
  colorButton.textContent = "Theme: " + colors[currentColorIndex].name;
  colorButton.onclick = () => {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    const selected = colors[currentColorIndex];
    saveTheme(selected);
    applyTheme(selected);
    colorButton.textContent = "Theme: " + selected.name;
  };

  categories["settings"].buttons.push(colorButton);
  applyTheme(savedTheme);

  function renderSidebar() {
    sidebar.innerHTML = "";
    Object.keys(categories).forEach((key, idx) => {
      const catBtn = document.createElement("button");
      catBtn.textContent = categories[key].label;
      if (idx === 0) catBtn.classList.add("active");
      catBtn.onclick = () => {
        [...sidebar.querySelectorAll("button")].forEach(b => b.classList.remove("active"));
        catBtn.classList.add("active");
        renderContent(key);
      };
      sidebar.appendChild(catBtn);
    });
    const firstKey = Object.keys(categories)[0];
    if (firstKey) renderContent(firstKey);
  }

  function renderContent(categoryKey) {
    content.innerHTML = "";
    const cat = categories[categoryKey];
    if (!cat) return;
    const btnGroup = document.createElement("div");
    btnGroup.className = "modButtonGroup";
    cat.buttons.forEach((btn) => btnGroup.appendChild(btn));
    content.appendChild(btnGroup);
  }

  renderSidebar();

  function waitForAnimationEndOnce(el, fallback = 600) {
    return new Promise((resolve) => {
      let resolved = false;
      function done() {
        if (resolved) return;
        resolved = true;
        resolve();
      }
      el.addEventListener("animationend", () => done(), { once: true });
      setTimeout(() => done(), fallback + 50);
    });
  }

  const minimizeBtn = document.getElementById("customMinimizeBtn");
  const closeBtn = document.getElementById("customCloseBtn");
  const restoreBtn = minimizedBox.querySelector("#customRestoreBtn");
  const miniCloseBtn = minimizedBox.querySelector("#customMiniCloseBtn");

  async function fullCleanup() {
  if (window.__customModMenuCleanupRan) return;
  window.__customModMenuCleanupRan = true;

  try {
    document.querySelectorAll("#customModContent button.toggle-active")
      .forEach(btn => btn.classList.remove("toggle-active"));
  } catch (e) {}

  try { document.querySelectorAll(".crypto-esp-label, .chest-answer-label").forEach(el => el.remove()); } catch(e){}

  try { if (typeof state !== "undefined" && state.interval) { clearInterval(state.interval); state.interval = null; } } catch {}
  try { if (typeof highlightInterval !== "undefined" && highlightInterval) { clearInterval(highlightInterval); highlightInterval = null; } } catch {}
  try { if (typeof chestAnswersInterval !== "undefined" && chestAnswersInterval) { clearInterval(chestAnswersInterval); chestAnswersInterval = null; } } catch {}
  try { if (typeof cryptoESPInterval !== "undefined" && cryptoESPInterval) { clearInterval(cryptoESPInterval); cryptoESPInterval = null; } } catch {}
  try { if (typeof fishingDistractionInterval !== "undefined" && fishingDistractionInterval) { clearInterval(fishingDistractionInterval); fishingDistractionInterval = null; } } catch {}
  try { if (typeof everyAnswerCorrectInterval !== "undefined" && everyAnswerCorrectInterval) { clearInterval(everyAnswerCorrectInterval); everyAnswerCorrectInterval = null; } } catch {}
  try { if (typeof _autoAnswerRAF !== "undefined" && _autoAnswerRAF) { cancelAnimationFrame(_autoAnswerRAF); _autoAnswerRAF = null; } } catch {}
  try { if (typeof _allCorrectRAF !== "undefined" && _allCorrectRAF) { cancelAnimationFrame(_allCorrectRAF); _allCorrectRAF = null; } } catch {}

  try { typeof restoreAllOriginals === "function" && restoreAllOriginals(); } catch (e) {}
  try { typeof restoreAll === "function" && restoreAll(); } catch (e) {}
  try { typeof restoreHighlights === "function" && restoreHighlights(); } catch (e) {}

  try { window.__tripleGoldPrize && typeof window.__tripleGoldPrize.disable === "function" && window.__tripleGoldPrize.disable(); } catch (e) {}

  try {
    if (window.fetch && Object.prototype.hasOwnProperty.call(window.fetch, "call")) {
      try { delete window.fetch.call; } catch (_) { try { window.fetch.call = Function.prototype.call; } catch(_) {} }
    }
  } catch (e) {}

  try {
    document.documentElement.style.removeProperty("--primary");
    document.documentElement.style.removeProperty("--toggled");
    document.documentElement.style.removeProperty("--hover");
  } catch (e) {}

  try { localStorage.removeItem("customMenuTheme"); } catch (e) {}

  try { document.removeEventListener("keydown", shiftToggleHandler); } catch (e) {}

  try { container && container.remove(); } catch (e) {}
  try { minimizedBox && minimizedBox.remove(); } catch (e) {}
  try { style && style.remove(); } catch (e) {}

  try { delete window.__customModMenu; } catch (e) {}
  try { delete window.__customMinimizedBox; } catch (e) {}
  try { delete window.__customModStyle; } catch (e) {}
  try { delete window.__highlightESP; } catch (e) {}
  try { delete window.highlightAnswers; } catch (e) {}
  try { delete window.__blooketHelpers; } catch (e) {}
  try { delete window.__tripleGoldPrize; } catch (e) {}
  try { delete window.__customModMenuCleanupRan; } catch (e) {}

  try { originalAnswers && originalAnswers.clear && originalAnswers.clear(); } catch (e) {}
  try { (categories && typeof categories === "object") && Object.keys(categories).forEach(k => delete categories[k]); } catch (e) {}
}

  minimizeBtn.onclick = async () => {
    if (container.classList.contains("minimizing")) return;

    container.classList.remove("closing", "maximizing");
    container.classList.add("minimizing");
    container.style.pointerEvents = "none";

    await waitForAnimationEndOnce(container, 400);
    container.classList.remove("minimizing");
    container.style.display = "none";
    container.style.pointerEvents = "";
    minimizedBox.style.display = "flex";
  };

  restoreBtn.onclick = async () => {
    if (container.style.display !== "none") return;
    minimizedBox.style.display = "none";
    container.style.display = "flex";
    container.classList.remove("closing", "minimizing");
    void container.offsetWidth;
    container.classList.add("maximizing");
    container.style.pointerEvents = "none";
    await waitForAnimationEndOnce(container, 450);
    container.classList.remove("maximizing");
    container.style.pointerEvents = "";
  };

closeBtn.onclick = async () => {
  document.querySelectorAll("#customModContent button.toggle-active")
    .forEach(btn => btn.classList.remove("toggle-active"));

  if (container.style.display === "none") return;

  container.classList.remove("minimizing", "maximizing");
  void container.offsetWidth;
  container.classList.add("closing");
  container.style.pointerEvents = "none";

  await waitForAnimationEndOnce(container, 400);

  fullCleanup();
};

miniCloseBtn.onclick = () => {
  document.querySelectorAll("#customModContent button.toggle-active")
    .forEach(btn => btn.classList.remove("toggle-active"));

  fullCleanup();
};

})();
