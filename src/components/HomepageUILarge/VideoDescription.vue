<template>
    <div class="main__video__description">
        <span class="video__workstream__tag">
            democracy
        </span>
        <div class="video__heading">
            <h2 class="video__title">The Boogaloo Ballad Of Henry Graves</h2>
            <p class="video__subtitle">Disinformation and Online Radicalization in the Age of COVID-19</p>
        </div>
        <div class="video__excerpt">
            <p>Misinformation and disinformation play a key role in the appeal of ‘boogaloo’ anti-government extremist groups. Conspiracy theories about local, state, and federal governments coming to “take your guns” or control local populations in other ways play a role in the appeal of the boogaloo scene. Anti-government extremism in the US was already increasing before COVID-19, but the pandemic has accelerated the circulation of anti-government conspiracy theories, disinformation and propaganda. There is an urgent need to develop a better understanding of online radicalization, and to create new avenues to connect with those at risk.</p>
        </div>
        <button type="button">play</button>
    </div>

</template>

<style lang="scss">

    .main__video__description {
        z-index: 1;
        position: absolute;
        width: 50%;
        height: 100%;
        max-height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        overflow: hidden;
        padding: 200px 100px;

        color: red//#FFFFFF;

    }
    .video__heading {
        padding-bottom: 60px;
    }
    .video__title {
        font-size: 48px;
        font-weight: 500;
        margin-bottom: 0;
    }
    .video__subtitle {
        opacity: 1;
    }
    .video__excerpt {
        padding-right: 150px;
    }
    .video__workstream__tag {
        display: inline-block;
        padding: 1px 8px 1px;
        font-weight: 600;
        font-size: 0.65rem;
        text-transform: uppercase;
        background-color: green;
        color: #FFFFFF;
    }


</style>
