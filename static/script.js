const messageInput1 = document.getElementById("message-input-1");
const messageInput2 = document.getElementById("message-input-2");
const messageInputs = document.getElementsByClassName("message-input");
const submitButton = document.getElementById("message-submit");
var names = [
  "Abe",
  "Abraham",
  "Addison",
  "Adelaide",
  "Adeline",
  "Agatha",
  "Agnes",
  "Albert",
  "Alejandra",
  "Alice",
  "Alma",
  "Amara",
  "Ambrose",
  "Amos",
  "Anita",
  "Ansel",
  "Archie",
  "Aron",
  "Arthur",
  "Artie",
  "Atticus",
  "August",
  "Barron",
  "Bea",
  "Beatrix",
  "Beau",
  "Benedict",
  "Bennett",
  "Bernadette",
  "Bernard",
  "Bertie",
  "Bessie",
  "Birdie",
  "Blaine",
  "Blevins",
  "Blythe",
  "Bonnie",
  "Brady",
  "Calliope",
  "Camille",
  "Carlo",
  "Carole",
  "Cassady",
  "Celia",
  "Clara",
  "Clarence",
  "Clellon",
  "Clifford",
  "Cole",
  "Colette",
  "Connie",
  "Cornelius",
  "Cyrus",
  "Dahlia",
  "Daisy",
  "Damion",
  "Darcy",
  "Dean",
  "Denton",
  "Dessie",
  "Dodie",
  "Dominic",
  "Dora",
  "Doris",
  "Dorothy",
  "Earl",
  "Edison",
  "Edith",
  "Edmund",
  "Edwin",
  "Elaine",
  "Eleanor",
  "Elijah",
  "Ellis",
  "Elmer",
  "Elon",
  "Elrod",
  "Emile",
  "Emily",
  "Emma",
  "Emmett",
  "Enid",
  "Ernest",
  "Erwin",
  "Ethel",
  "Etta",
  "Eugenie",
  "Evangeline",
  "Evelyn",
  "Ezra",
  "Faith",
  "Fanny",
  "Faye",
  "Felix",
  "Fletcher",
  "Flora",
  "Florence",
  "Frances",
  "Francis",
  "Frank",
  "Gabrielle",
  "Gael",
  "Galatea",
  "Genevieve",
  "George",
  "Georgia",
  "Gerald",
  "Gert",
  "Gertrude",
  "Gracy",
  "Greta",
  "Gunther",
  "Gus",
  "Harmon",
  "Harold",
  "Harper",
  "Harriet",
  "Harvey",
  "Hattie",
  "Hayden",
  "Hazel",
  "Hector",
  "Henrietta",
  "Henry",
  "Herbert",
  "Hester",
  "Hilda",
  "Holden",
  "Hope",
  "Howard",
  "Hugh",
  "Ian",
  "Ignatius",
  "Imogen",
  "Inez",
  "Irene",
  "Iris",
  "Isabella",
  "Jane",
  "Jarrett",
  "Jasper",
  "Jedediah",
  "Jerry",
  "Joan",
  "Jocelyn",
  "Joel",
  "Josephine",
  "Joyce",
  "Julien",
  "Katherine",
  "Kenneth",
  "Kingsley",
  "Lacey",
  "Lacy",
  "Langston",
  "Laura",
  "Lee",
  "Lincoln",
  "Liza",
  "Lorraine",
  "Louis",
  "Lucas",
  "Lucille",
  "Lucinda",
  "Luisa",
  "Lydia",
  "Margaret",
  "Marjorie",
  "Marshall",
  "Martha",
  "Mathilde",
  "Maxine",
  "Mickey",
  "Milton",
  "Minnie",
  "Miriam",
  "Mollie",
  "Morgan",
  "Neal",
  "Nell",
  "Nelson",
  "Neville",
  "Nora",
  "Norene",
  "Norman",
  "Octavia",
  "Olive",
  "Opal",
  "Orville",
  "Oscar",
  "Otis",
  "Owen",
  "Patricia",
  "Pearl",
  "Penelope",
  "Peyton",
  "Pierce",
  "Polly",
  "Pollyanna",
  "Posey",
  "Presley",
  "Preston",
  "Ralph",
  "Randall",
  "Rawlins",
  "Raymond",
  "Reed",
  "Reginald",
  "Richard",
  "Rodney",
  "Rolla",
  "Rollo",
  "Rosemary",
  "Roy",
  "Ruby",
  "Ruth",
  "Rutherford",
  "Sadie",
  "Sal",
  "Sandra",
  "Scarlet",
  "Selma",
  "Seraphina",
  "Shadrack",
  "Sherman",
  "Shirley",
  "Shoshana",
  "Sophia",
  "Spencer",
  "Stanley",
  "Sterling",
  "Susannah",
  "Sylvia",
  "Theodore",
  "Tobias",
  "Tobin",
  "Trudy",
  "Una",
  "Valentina",
  "Vera",
  "Viola",
  "Violet",
  "Virginia",
  "Waldo",
  "Whitman",
  "Wilber",
  "Wilbert",
  "Willa",
  "Willie",
  "Windsor",
  "Winston",
  "Wren",
  "Wright",
  "Wyatt",
];
var identifier;
function setIdentifier() {
  if (localStorage.getItem("identifier") == null) {
    var name = names[Math.floor(Math.random() * names.length)];
    var number = Date.now() % 10000;

    identifier = name + "#" + number;
    localStorage.setItem("identifier", identifier);
  }
  identifier = localStorage.getItem("identifier");
  document.querySelector(".identifier").innerHTML = identifier;
}

async function getMessage() {
  try {
    const response = await fetch("/message", {
      headers: {
        "api-key": identifier,
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (data.line_1 || data.line_2) {
        messageInput1.value = data.line_1;
        messageInput2.value = data.line_2;
        messageInput1.style.color = "black"; // Set text color to black
        messageInput2.style.color = "black"; // Set text color to black
      } else {
        messageInput1.value = "";
        messageInput2.value = "";
        messageInput1.style.color = "inherit"; // Reset text color to default
        messageInput2.style.color = "inherit"; // Reset text color to default
      }
    } else {
      console.error("Error fetching message:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function handleSubmit(event) {
  messageInput1.style.color = "black"; // Set text color to black
  messageInput2.style.color = "black"; // Set text color to black
  messageInput1.style.borderColor = "rgba(0, 0, 0, 0)"; // Set border to green
  messageInput2.style.borderColor = "rgba(0, 0, 0, 0)"; // Set border to green
  submitButton.style.backgroundColor = "#f0f0f0";
  if (event.key === "Enter" || event.type === "click") {
    const messageLine1 = messageInput1.value.trim();
    const messageLine2 = messageInput2.value.trim();
    try {
      const response = await fetch("/message", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "api-key": identifier,
        },
        body: JSON.stringify({ messageLine1, messageLine2 }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      // messageInput.style.color = 'green'; // Set text color to black
      messageInput1.style.borderColor = "green"; // Set border to green
      messageInput2.style.borderColor = "green"; // Set border to green
      submitButton.style.backgroundColor = "green";
    } catch (error) {
      console.error(error);
      // messageInput.style.color = 'red'; // Set text color to black
      messageInput1.style.borderColor = "red"; // Set border to green
      messageInput2.style.borderColor = "red"; // Set border to green
    }
  }
}

for (var i = 0; i < messageInputs.length; i++) {
  messageInputs[i].addEventListener("keyup", handleSubmit, false);
}

submitButton.addEventListener("click", handleSubmit, false);

setIdentifier();
getMessage();
