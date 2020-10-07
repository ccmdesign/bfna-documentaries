<template>
  <div id="mc_embed_signup">
    <form action="https://bfna.us20.list-manage.com/subscribe/post?u=53fc7e266c23506906a0a602f&amp;id=4447bf4515"
      method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank"
      novalidate>
      <div id="mc_embed_signup_scroll">
        <div class="mc-field-group">
          <input type="text" value="" name="FNAME" class="subscription-input" id="mce-FNAME" placeholder="Name">
        </div>
        <div class="mc-field-group">
          <input type="email" value="" name="EMAIL" class="required email subscription-input" id="mce-EMAIL" placeholder="E-mail">
        </div>
        <div id="mergeRow-interests" class="mc-field-group input-group" aria-hidden="true">
          <strong>I'm interested in </strong>
          <ul>
            <li><input type="checkbox" value="1" name="group[3633][1]" id="mce-group[3633]-3633-0" checked><label
                for="mce-group[3633]-3633-0">How to Fix Democracy</label></li>
          </ul>
        </div>
        <div id="mergeRow-gdpr" class="mergeRow gdpr-mergeRow content__gdprBlock mc-field-group" aria-hidden="true">
          <div class="content__gdpr">
            <fieldset class="mc_fieldset gdprRequired mc-field-group" name="interestgroup_field">
              <label class="checkbox subfield" for="gdpr_1657"><input type="checkbox" id="gdpr_1657" name="gdpr[1657]"
                  value="Y" class="av-checkbox" checked><span>Email</span> </label>
            </fieldset>
          </div>
        </div>
        <div id="mce-responses" class="clear">
          <div class="response" id="mce-error-response" style="display:none"></div>
          <div class="response" id="mce-success-response" style="display:none"></div>
        </div>
        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text"
            name="b_53fc7e266c23506906a0a602f_4447bf4515" tabindex="-1" value=""></div>
        <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
            class="button subscription-submit"></div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
#mc_embed_signup {
  padding: 16px 0;
}

#mergeRow-gdpr, #mergeRow-interests {
  display: none;
}

.subscription-input {
  display: block;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.33);
  background: none;
  padding: 10px 18px;
  margin: 0 0 16px 0;
  color: #ffffff;

  &:active {
    border-color: #ffffff;
  }
}

.subscription-submit {
  border: none;
  background-color: #fc8b00;
  color: #ffffff;
  text-transform: uppercase;
  padding: 10px 32px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: lighten(#fc8b00, 9);
  }

  &:disabled {
    opacity: 0.33;
    pointer-events: none;
  }
}
</style>

<script>
export default {
  name: 'NewsletterSubscription'
}
</script>
