<template>
    <div class="full_content">
        <div class="header">
            <img src="../../assets/bertelsmann-logo.png" width="150"/>
            <div class="header__title">
                <h3>Documentaries</h3>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

.full_content {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    max-height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    overflow: hidden;
    background-color: rgba(17, 24, 41, 0.65);
    padding: 70px 100px;
}

.header {
    display: flex;
    align-items: flex-start;
    width: fit-content;

    &__title {
        color: #FC8B00;
        text-transform: uppercase;
        font-size: 34px;
        font-weight: 500;
        padding-left: 45px;
    }
}


</style>
