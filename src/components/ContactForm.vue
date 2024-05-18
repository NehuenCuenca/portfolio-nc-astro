<template>
    <form @submit.prevent="sendEmail" class="form-contact">
        <div class="field">
            <label for="input-name" class="field__label">Nombre y apellido</label>
            <input type="text" class="field__input" id="input-name" name="interested_name" required minlength="5" maxlength="40" placeholder="¿Quien me escribe?">
        </div>
        <div class="field">
            <label for="input-email" class="field__label">Email</label>
            <input type="email" class="field__input" id="input-email" name="interested_email" required minlength="5" maxlength="50" placeholder="¿Cual es el email del interesado?">
        </div>
        <div class="field">
            <label for="input-matter" class="field__label">Asunto</label>
            <input type="text" class="field__input" id="input-matter" name="matter" required minlength="5" maxlength="50" placeholder="¿Por qué me escribe?">
        </div>
        <div class="field">
            <label for="input-message" class="field__label">Mensaje</label>
            <textarea class="field__input-message" id="input-message" name="msg" required minlength="20" placeholder="¿Necesita detallar más?"></textarea>
        </div>
        <input class="form-contact__submit-button" type="submit" value="Enviar mail">
    </form>
</template>

<script setup>
    import emailjs from '@emailjs/browser';
   
    const sendEmail = (event) => {
        const { interested_name, interested_email, matter, msg } = Object.fromEntries(new FormData(event.target));
        var tempParams = {
            from_name: interested_name,
            from_email: interested_email,
            subject: matter,
            message: msg,
        };

        emailjs.send('service_wthxhkr', 'template_01utqqw', tempParams, { publicKey: 'DAtZZyNNpb20cqvDq'})
        .then(function(res){
            console.log('Mail was send successfully', res.status)
        })
    }
</script>



<style scoped>
    .form-contact{
        width: clamp(250px, 100%, 400px);
        padding: 4rem 1rem 1rem 1rem;
        border: 3px solid var(--color-bg);
        border-radius: 10px 100px 10px 10px ;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }
    .field{
        width: 100%;
        padding: .5rem;
        border-radius: 10px;
        border: 3px solid var(--color-bg);
        transition: border .2s ease;
    }
    .field__label{
        font: normal normal 600 clamp(1.2rem, 6vw, 1.4rem) var(--default-font, Arial);
        cursor: pointer;
    }
    .field__input, .field__input-message{
        width: 100%;
        height: 50%;
        background-color: transparent;
        outline: none;
        border: none;
        font: normal normal 200 clamp(1.1rem, 6vw, 1.3rem) var(--default-font, Arial);
        color: var(--color-details);
    }

    .field__input:invalid{
        z-index: 1;
    }

    .field:has(:focus){
        border-color: var(--color-titles);
    }
    .field:has(:user-invalid){
        border-color: red;
    }

    .field__input-message{
        min-height: 20vh;
        text-align: start;
        vertical-align: text-top;
        resize: vertical;
    }

    .form-contact__submit-button{
        margin: auto 0 0 0;
        background-color: var(--color-bg);
        color: var(--color-titles);
        border: none;
        border-radius: 10px;
        padding: .5rem;
        font: normal normal 600 clamp(1.2rem, 6vw, 1.5rem) var(--display-font, Tahoma);
        cursor: pointer;
        transition: background .5s ease;
    }
    .form-contact__submit-button:hover{
        background-color: var(--color-details);
    }
</style>