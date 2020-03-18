const previewArea = document.querySelector('#preview');
const submitButton = document.querySelector('#cv_generate');
const messageInput = document.querySelector('#cv_message');
const fixedCheckbox = document.querySelector('#cv_fixed');
const wrapLinkCheckbox = document.querySelector('#cv_wrap_link');
const linkURLInput = document.querySelector('#cv_link_url');
const linkTextInput = document.querySelector('#cv_link_text');
const linkColourInput = document.querySelector('#cv_link_colour');
const backgroundInput = document.querySelector('#cv_background');
const textColourInput = document.querySelector('#cv_foreground');
const codeOutput = document.querySelector('#cv_code');

function checkLinkWrapValue(){
    if(this.checked){
        linkTextInput.style.display = 'none';
    }else{
        linkTextInput.removeAttribute('style');
    }
}
checkLinkWrapValue.bind(wrapLinkCheckbox)();

wrapLinkCheckbox.onchange = checkLinkWrapValue;

submitButton.onclick = function(e){
    e.preventDefault();
    let blockStyles = `
<style>
    .cv-banner {
        display: none;
        position: relative;
        font-size: 1em;
        box-sizing: border-box;
        text-align: center;
        font-weight: bold;
        width: 100%;
        padding: 15px 45px;
        color: ${textColourInput.value};
        background: ${backgroundInput.value};
    }
    .cv-banner a {
        color: ${linkColourInput.value};
        ${wrapLinkCheckbox.checked ? 'text-decoration: none;' : ''}
    }
    .cv-banner .cv-close {
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 15px;
        height: 1em;
        width: 1em;
        background: rgba(0,0,0,0.5);
        border-radius: 50%;
    }
    .cv-banner .cv-close::before {
        content: '';
        width: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        height: 2px;
        background: ${textColourInput.value};
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
    }
    .cv-banner .cv-close::after {
        content: '';
        width: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        height: 2px;
        background: ${textColourInput.value};
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
    }
</style>
            `;
    let fixedStyles = `
<style>
    .cv-banner {
        display: none;
        font-size: 1em;
        position: fixed;
        box-sizing: border-box;
        text-align: center;
        font-weight: bold;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 15px 45px;
        color: ${textColourInput.value};
        background: ${backgroundInput.value};
    }
    .cv-banner a {
        color: ${linkColourInput.value};
        ${wrapLinkCheckbox.checked ? 'text-decoration: none;' : ''}
    }
    .cv-banner .cv-close {
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 15px;
        height: 1em;
        width: 1em;
        background: rgba(0,0,0,0.5);
        border-radius: 50%;
    }
    .cv-banner .cv-close::before {
        content: '';
        width: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
        height: 2px;
        background: ${textColourInput.value};
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
    }
    .cv-banner .cv-close::after {
        content: '';
        width: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        height: 2px;
        background: ${textColourInput.value};
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
    }
</style>`;

    const cvScript = document.createElement('script');
    cvScript.innerHTML = `(function(){
        let cvBanner = document.querySelector('.cv-banner');
        let cvClose = cvBanner.querySelector('.cv-close');
        console.log("test");
        cvClose.onclick = function(){
            cvBanner.style.display = "none";
            document.cookie = "cvDismissed=" + cvClose.getAttribute('data-timestamp') + ";path=/";
        }
        var v = document.cookie.match('(^|;) ?cvDismissed=([^;]*)(;|$)');
        if((v ? v[2] : null) != cvClose.getAttribute('data-timestamp')){
            cvBanner.style.display = "block";
        }
        var value = "; " + document.cookie;
    })();`;

    let cvBanner = document.createElement('div');
    cvBanner.className = "cv-banner";
    let cvClose = document.createElement('span');
    cvClose.className = 'cv-close';
    cvClose.setAttribute('data-timestamp', new Date().getTime());

    let message = wrapLinkCheckbox.checked ? document.createElement('a') : document.createElement('span');
    message.innerText = messageInput.value;

    if(wrapLinkCheckbox.checked){
        message.href = linkURLInput.value;
    }else{
        let link = document.createElement('a');
        link.innerText = linkTextInput.value;
        link.href = linkURLInput.value;
        message.appendChild(document.createTextNode(' '));
        message.appendChild(link);
    }

    cvBanner.appendChild(message);
    cvBanner.appendChild(cvClose);

    let output = cvBanner.outerHTML + (fixedCheckbox.checked ? fixedStyles : blockStyles);
    previewArea.innerHTML = output;
    previewArea.appendChild(cvScript);
    codeOutput.value = output;
    return false;
};