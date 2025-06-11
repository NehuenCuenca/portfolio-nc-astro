<template>
    <form @submit.prevent="sendEmail" class="contact-form" ref="contactForm">
        <div class="contact-form__field">
            <div class="contact-form__field-label-input-wrapper">
                <label for="input-name" class="contact-form__field-label">Nombre y apellido</label>
                <input @input="checkValidationError" @invalid.prevent="checkValidationError" type="text" class="contact-form__field-input" id="input-name" name="interested_name" required minlength="5" maxlength="40" placeholder="¿Quien me escribe?">
            </div>
            <p class="contact-form__field-error-msg">Acá debería haber un error 😯</p>
        </div>
        <div class="contact-form__field">
            <div class="contact-form__field-label-input-wrapper">
                <label for="input-email" class="contact-form__field-label">Email</label>
                <input @input="checkValidationError" @invalid.prevent="checkValidationError" type="email" class="contact-form__field-input" id="input-email" name="interested_email" required minlength="5" maxlength="50" placeholder="¿Cual es el email del interesado?">
            </div>
            <p class="contact-form__field-error-msg">Acá debería haber un error 😯</p>
        </div>
        <div class="contact-form__field">
            <div class="contact-form__field-label-input-wrapper">
                <label for="input-matter" class="contact-form__field-label">Asunto</label>
                <input @input="checkValidationError" @invalid.prevent="checkValidationError" type="text" class="contact-form__field-input" id="input-matter" name="interested_matter" required minlength="5" maxlength="50" placeholder="¿Cual es el tema a tratar?">
            </div>
            <p class="contact-form__field-error-msg">Acá debería haber un error 😯</p>
        </div>
        <div class="contact-form__field">
            <div class="contact-form__field-label-input-wrapper">
                <label for="input-message" class="contact-form__field-label">Mensaje</label>
                <textarea @input="checkValidationError" @invalid.prevent="checkValidationError" class="contact-form__field-input" id="input-message" name="interested_message" required minlength="20" maxlength="200" placeholder="Detalla aquí lo que necesites."></textarea>
            </div>
            <p class="contact-form__field-error-msg">Aca debería haber un error 😯</p>
        </div>
        <div class="contact-form__footer">
            <button class="contact-form__submit-button" type="submit" :disabled="!fieldsAreFilled" v-if="!isSendingEmail">Enviar mail</button>
            <div class="loader" v-else></div>
            <p ref="messageAfterSubmit" class="contact-form__general-msg contact-form__general-msg_hidden"></p>
        </div>
    </form>
</template>

<script setup>
    import emailjs from '@emailjs/browser';
    import { ref } from 'vue';

    const contactForm = ref(null)
    const messageAfterSubmit = ref(null)

    const checkValidationError = (event) => { 
        const inputElement = event.target
        const inputValidity = inputElement.validity
        const inputValidationMsg = inputElement.validationMessage
        //console.log({inputValidity, inputValidationMsg});
        
        const trimmedInputValue = inputElement.value.trim()
        const mininumLengthOfInput = Number(inputElement.getAttribute('minlength'))
        if( trimmedInputValue.length < mininumLengthOfInput ) {
            return setValidationError({ inputElement, inputValidationMsg: `La cantidad minima de caracteres es de ${mininumLengthOfInput}` }) 
        } else {
            setValidationError({ inputElement, inputValidationMsg: '' })
        }
    
        if( !inputValidity.valid ) return setValidationError({ inputElement, inputValidationMsg }) 
        setValidationError({ inputElement, inputValidationMsg: '' })
    }

    const fieldsAreFilled = ref(false)
    const toggleDisableAttributeForSubmitButton = () => { 
        const textInputs = [...contactForm.value.querySelectorAll('[required]')]
        fieldsAreFilled.value = textInputs.every(input => input.validity.valid)
    }

    const setValidationError = ({ inputElement, inputValidationMsg }) => { 
        inputElement.setCustomValidity(inputValidationMsg)
        const fieldElement = inputElement.parentElement.parentElement
        fieldElement.querySelector('.contact-form__field-error-msg').textContent = inputValidationMsg
        toggleDisableAttributeForSubmitButton() 
    }
   
    const isSendingEmail = ref(false)
    const sendEmail = async(event) => {
        const { interested_name, interested_email, interested_matter, interested_message } = Object.fromEntries(new FormData(event.target)); 
        var templateParams = {
            from_name: interested_name,
            from_email: interested_email,
            subject: interested_matter,
            message: interested_message,
        };

        const serviceID = 'service_wthxhkr'
        const templateID = 'template_01utqqw'
        const emailjsKey = import.meta.env.PUBLIC_EMAILJSKEY

        try {
            isSendingEmail.value = true
            const response = await emailjs.send(serviceID, templateID, templateParams, { publicKey: emailjsKey })
            if(response.status === 200) {
                isSendingEmail.value = false
                if(messageAfterSubmit.value){
                    contactForm.value.reset()
                    messageAfterSubmit.value.classList = 'contact-form__general-msg'
                    messageAfterSubmit.value.innerHTML = '¡Tu email fue enviado exitosamente!'
                }
            }
        } catch (error) {
            console.error(error);
            isSendingEmail.value = false
            if(messageAfterSubmit.value){
                messageAfterSubmit.value.classList = 'contact-form__general-msg contact-form__general-msg_error'
                messageAfterSubmit.value.innerHTML = `¡Ocurrió un error al enviar tu mail (${error.text})! <br> Intentalo de vuelta, mas tarde.`
            }
        }

        setTimeout(() => {
            messageAfterSubmit.value.classList = 'contact-form__general-msg contact-form__general-msg_hidden'
            messageAfterSubmit.value.innerHTML = ''
        }, 5000);
    }
</script>



<style scoped>
    .contact-form{
        width: clamp(300px, 50%, 500px);
        padding: 0 1rem 1rem 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5dvh;
    }
    .contact-form__field{
        width: 100%;
    }
    .contact-form__field-label-input-wrapper{
        padding: .5rem;
        border-radius: 10px;
        border: 3px solid transparent;
        background-color: var(--secondary-bg-color);
        transition: border .3s ease;
    }
    .contact-form__field-label{
        font: normal normal 400 clamp(var(--body-lg-fs), 2vw, var(--heading-sm-fs)) var(--display-font, Arial);
        cursor: pointer;
    }
    .contact-form__field-input, .contact-form__field-txt-area{
        width: 100%;
        height: 50%;
        background-color: transparent;
        outline: none;
        border: none;
        font: normal normal 200 clamp(var(--body-sm-fs), 5vw, var(--subtitle-fs)) var(--default-font, Arial);
        color: var(--paragraph-color);
    }

    .contact-form__field-input::placeholder{
        color: var(--input-placeholder-color);
    }
    .contact-form__field-input:invalid{
        z-index: 1;
    }

    .contact-form__field-label-input-wrapper:has(:focus){
        border-color: var(--title-color);
    }
    .contact-form__field-label-input-wrapper:has(:user-invalid){
        border-color: var(--error-color-500);
        animation: shakeHorizontal .4s ease 0s 1 normal forwards;
    }

    .contact-form__field-error-msg{
        display: none;
        color: var(--error-text-color);
        font: normal normal 400 1.1rem var(--default-font);
        margin-top: .5rem;
    }

    .contact-form__field-label-input-wrapper:has(:user-invalid) + .contact-form__field-error-msg{
        display: block;
    }

    .contact-form__field-txt-area{
        min-height: 20vh;
        text-align: start;
        vertical-align: text-top;
        resize: vertical;
    }

    .contact-form__submit-button{
        background-color: var(--title-color);
        color: var(--primary-bg-color);
        border: none;
        border-radius: 10px;
        padding: .5rem;
        font: normal normal 400 clamp(1.2rem, 6vw, 1.5rem) var(--display-font, Tahoma);
        cursor: pointer;
        transition: background-color .3s ease;
    }
    .contact-form__submit-button:hover{
        background-color: var(--paragraph-color);
    }
    .contact-form__submit-button:disabled{
        color: var(--phrase-color);
        background-color: var(--secondary-bg-color);
        cursor: not-allowed;
    }

    .contact-form__general-msg{
        color: var(--paragraph-color);
        font: normal normal 400 var(--body-lg-fs) var(--default-font);
        text-align: center;
        transition: opacity .3s ease;
    }  

    .contact-form__general-msg_error{
        color: var(--error-text-color);
    }

    .contact-form__general-msg_hidden{ opacity: 0; }

    .loader {
        width: 50px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: 
            radial-gradient(farthest-side,var(--paragraph-color) 94%,#0000) top/8px 8px no-repeat,
            conic-gradient(#0000 30%,var(--paragraph-color));
        -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 8px),#000 0);
        animation: l13 1s infinite linear;
    }

    @keyframes l13{ 
        100%{transform: rotate(1turn)}
    }

    .contact-form__footer{
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1rem;
    }

    @keyframes shakeHorizontal {
        0%,
        100% {
            transform: translateX(0);
        }

        10%,
        30%,
        50%,
        70% {
            transform: translateX(-3px);
        }

        20%,
        40%,
        60% {
            transform: translateX(3px);
        }

        80% {
            transform: translateX(1px);
        }

        90% {
            transform: translateX(-1px);
        }
    }
</style>