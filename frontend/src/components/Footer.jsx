import React from "react"

export const Footer = () => {
    return (
        <div>
            <div>
            <img class="imgFooter" src="/img/ELECTROGIRAU.jpg" alt="logo electrogirau"></img>
            <img class="imgFooter" src="/img/redesSinFondo.png" alt="redes"></img>
            </div>
            <div>
                <p class="suscribite">Si queres recibir nuestras novedades suscríbete aquí:</p>
                <form action="">
                <label>Email:</label><input type="email" name="email" placeholder="Email" />
                </form>
            </div>
        </div>
    )
}