<template>
  <div id="menu">
    <div class="title">
      <div class="header">
        Save Bloody Run
      </div>
      <div class="subheader">
        Open Records Database
      </div>
    </div>
    <div class="account">
      <v-menu
        rounded="lg"
        offset-y
        nudge-bottom="12"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card class="sign-in-card" v-if="!session">
          <div class="google-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
          </div>
          <div class="sign-in-message">
            Sign in with your Google account to manage document attributes.
          </div>
          <SbrButton @click="loginWithGoogle">
            Sign In
          </SbrButton>
        </v-card>
        <v-card class="sign-in-card" v-else>
          <img class="profile-pic" :src="session.picture" />
          <div class="email">{{session.email}}</div>
          <div class="name">{{session.name}}</div>
          <SbrButton @click="loginWithGoogle">
            Sign Out
          </SbrButton>
        </v-card>
      </v-menu>
    </div>
    <v-snackbar
      v-model="snackbar"
      color="red accent-1"
      rounded="pill"
    >
      Sign in failed
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import SbrButton from '@/components/Shared/SbrButton';
import {OAuth2Client} from 'google-auth-library';
import { mapState } from 'vuex';

export default {
  name: 'Menu',
  components: {
    SbrButton
  },
  data: () => ({
      snackbar: false,
  }),
  computed: mapState({
    session: (state) => state.session,
  }),
  methods: {
    async loginWithGoogle () {
      try {
        const GoogleUser = await this.$gAuth.signIn();
        // on success do something
        console.error('GoogleUser', GoogleUser)
        var userInfo = {
          loginType: 'google',
          google: GoogleUser
        };

        const client = new OAuth2Client('479366963206-r2oukcjsb93f0cd3318kohjms8ars04c.apps.googleusercontent.com');
        const ticket = await client.verifyIdToken({
          idToken: userInfo.google.wc.id_token,
          requiredAudience: 'x479366963206-r2oukcjsb93f0cd3318kohjms8ars04c.apps.googleusercontent.com'
        });
        const payload= ticket.getPayload();
        this.$store.commit('setSession', payload);
      } catch (err) {
        this.snackbar = true;
      }

      // const userid = payload['sub'];
      // let email = payload['email'];
      // let emailVerified = payload['email_verified'];
      // let name = payload["name"];
      // let pictureUrl = payload["picture"];
      // this.$store.commit('setLoginUser', userInfo)
      // router.push('/home')
    }
  }
};
</script>

<style scoped>
#menu {
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 56px;
  padding-left: 24px;
  padding-right: 24px;
  position: fixed;
  width: 100%;
  box-shadow: 0 1px 11px rgb(0 0 0 / 12%);
  z-index: 2;
}

.title {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.account {
  display: flex;
  align-items: center;
}

.account .v-menu__content {
  margin-top: 12px;
}

.sign-in-card {
  max-width: 300px;
  width: 100vw;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.google-icon {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}

.sign-in-message {
  padding-bottom: 20px;
  text-align: center;
}

.profile-pic {
  align-self: center;
  border-radius: 50% !important;
  height: 80px;
  width: 80px;
  margin-bottom: 20px;
}

.email {
  align-self: center;
}

.name {
  align-self: center;
  padding-bottom: 20px;
}
</style>
