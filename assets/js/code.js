const linkBtn = $('#link-button');
const linkInput = $('#link-input').val();
const hamburguerIcon = $('.hamburguer-icon');


function copyText(elem){
    let temp = $(`<input>`);
    $('body').append(temp);
    temp.val($(elem).text()).select();
    document.execCommand('Copy');
    temp.remove();
}


function updateCopyButtons(){
    let copyButtonContainers = document.querySelectorAll(".lp-btn");
    copyButtonContainers.forEach(copyButtonContainer => {
        let copyButton = copyButtonContainer.querySelector('button');
        $(copyButton).click(function(e){
            e.preventDefault();
            let shortLink = copyButtonContainer.previousElementSibling.querySelector('span');
            copyText(shortLink);
            copyButton.classList.add("backgroundColorDarkViolet");
            copyButton.innerText="Copied!";
        });
    });
}


function addChild(data){
    let content = data.result;
    console.log(content);
    let domElement = `
        <div class="lp-child">

            <div class="original-link">
                <span>${content.original_link}</span>
            </div>

            <div class="short-link">
                <span id="sl-link">${content.short_link2}</span>
            </div>

            <div class="lp-btn">
                <button type="submit" id="copy-btn">Copy</button>
            </div>

        </div>
    `
    $('#link-provider').append(domElement);
    linkBtn.removeClass('backGroundColorLightBlue');
    linkBtn.text("Shorten It!");
    updateCopyButtons();
}

function fetch(){
    $.ajax({
        url: "https://api.shrtco.de/v2/shorten",
        method: "GET",
        success: addChild,
        data: {
            url: $('#link-input').val(),
        }
    });
}

function testIfValidURL(str) {
    const pattern = new RegExp(
      "^https?:\\/\\/" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + 
        "((\\d{1,3}\\.){3}\\d{1,3}))" + 
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + 
        "(\\?[;&a-z\\d%_.~+=-]*)?" + 
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); 
  
    return !!pattern.test(str);
}


$(linkBtn).click(function(e){
    e.preventDefault();
    if(!testIfValidURL($('#link-input').val())){
        $('.invalid-link-message').addClass('display-block');
        return;
    }
    $('.invalid-link-message').removeClass('display-block');
    fetch();
    linkBtn.addClass('backGroundColorLightBlue');
    linkBtn.text("Generating...");
});

function updateMenu(){
    $('.menu-mobile').toggleClass('slide');
    hamburguerIcon.toggleClass('burger-open');
    let elements = document.querySelectorAll('.menu-mobile ul li');
    elements.forEach(element => {
        if(element.style.animation){
            element.style.animation = '';
        }else{
            element.style.animation = `burger-menu-animation 1.5s ease forwards`;
        }
    });
}

$(hamburguerIcon).click(updateMenu);