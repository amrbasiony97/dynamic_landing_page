/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

let cnt = 0;
const btnContainer = document.querySelector('.btn-container');
const navBar = document.getElementById('navbar__list');
let sections;
const add = document.querySelector('.add-section');
const remove = document.querySelector('.remove-section');
const topPage = document.querySelector('.top');
const hamburger = document.querySelector(".hamburger");



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function addNav(i, value) {
  // create a new list item
  const newListItem = document.createElement('li');

  // building the innerHTML of each list item and making use of sections attributes
  newListItem.innerHTML = `<a href=\"section${i}\" id=\"${value}\">Section ${i}</a>`;

  // append list node to the nav unordered list 
  navBar.appendChild(newListItem);
}

// remove last nav element
function removeNav() {
  navBar.removeChild(navBar.lastChild);
}

// add new section
function addSection() {
  cnt++;

  // create a new section
  let _newSection_ = document.createElement('section');

  // add attributes to the section
  _newSection_.setAttribute("id", `section${cnt}`);
  _newSection_.setAttribute("data-nav", `section ${cnt}`);

  // Add HTML content
  _newSection_.innerHTML = `
      <div class="landing__container">
        <h2>Section ${cnt}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae lit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

        <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
      </div>
      `;
      btnContainer.insertAdjacentElement('beforebegin', _newSection_);

      // add the new section to navbar
      addNav(cnt, _newSection_.getAttribute("data-nav"));

      // add the new added section to sections nodelist
      sections = document.querySelectorAll('section');
      if(cnt === 1) {
        toggleRmBtn();
      }
      makeActive();
}

// remove last added section
function removeSection() {
  cnt--;
  sections[cnt].remove();
  sections = document.querySelectorAll('section');
  console.log(sections);
  removeNav();
  if(cnt === 0) {
    toggleRmBtn();
  }
}

// build first 4 sections automatically
for (let i=0; i<4; i++) {
  addSection();
}

// Change style of active section
function makeActive() {
  const options = {threshold: 0.7};
  const observer = new IntersectionObserver(function(entries, observer){
    for (let entry of entries) {

      let navItem = document.getElementById(entry.target.getAttribute('data-nav'));

      // activate section in viewport and its corresponding navigation link
      if(entry.isIntersecting) {
        entry.target.classList.add('your-active-class');
        navItem.classList.add('activeNav');
      }

      // deactivate section in viewport and its corresponding navigation link
      else {
        entry.target.classList.remove('your-active-class');
        navItem.classList.remove('activeNav');
      }
    }
  }, options);

  // apply observation function on each section
  for (let section of sections) {
    observer.observe(section);
  }
}

// class "zero-cnt" will hide the remove button if there is no section
function toggleRmBtn() {
  remove.classList.toggle('zero-cnt');
}

// hide top button at the top
document.onscroll = function() {
  if (window.scrollY < 600) {
    topPage.style.display = "none";
  } else {
    topPage.style.display = "flex";
  }
}


/**
 * End Main Functions
 * Begin Events
 * 
 */


// Add Section
add.addEventListener('click', function() {
  addSection();
});

// Remove Section
remove.addEventListener('click', function() {
  removeSection();
})

// Scroll to section on link click
navBar.addEventListener('click', function(ev) {
  ev.preventDefault();
  document.getElementById(ev.target.getAttribute('href')).scrollIntoView({behavior: "smooth"});
  hamburger.classList.remove("active");
  navBar.classList.remove("active");
})

// Scroll to top of the page
topPage.addEventListener('click', function() {
  document.documentElement.scrollIntoView({top: 0, behavior: "smooth"});
})

// Nav hamburger button event
hamburger.addEventListener("click", function() {
  hamburger.classList.toggle("active");
    navBar.classList.toggle("active");
});