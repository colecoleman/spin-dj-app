<template>
  <section v-if="view === 1">
    <div class="heading">
      <h4>Now, let's learn a bit about the platform.</h4>
      <button-standard-with-icon
        text="Jump in when you're ready"
        @click="navigateToDashboard"
      />
    </div>
    <div class="card-container">
      <div class="scroll-wrapper half-width">
        <div
          v-for="(tab, name, index) in tabs"
          :key="index"
          :id="name + '-card'"
          :class="name == activeTab ? 'config-card' : 'config-card inactive'"
          @click="assignActiveTab(name)"
        >
          <base-card :title="tab.title" :svg="tab.icon ? tab.icon : ''">
            <template v-slot:content>
              <p>
                <span>{{ tab.body }}</span>
              </p>
            </template>
          </base-card>
        </div>
      </div>
      <div class="scroll-wrapper half-width">
        <div
          v-for="(card, name, index) in tabs[activeTab].cards"
          :key="index"
          class="config-card"
        >
          <base-card :title="card.title" :svg="card.icon ? card.icon : ''">
            <template v-slot:content>
              <p v-html="card.body"></p>
            </template>
          </base-card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      view: 1,
      activeTab: "dashboard",
      tabs: {
        dashboard: {
          title: "Dashboard Tab",
          icon: "toolbox",
          body: "This is where the magic happens. From here, you can view upcoming events, view your calendar, view your sales in particular metrics, and view recent messages via the in-app chat function. As Spin DJ becomes more developed, this will become more and more integral in the operation of your daily routine.",
          cards: [
            {
              icon: "disc",
              title: "Events",
              body: "View your events from your dashboard. You can click on an event to be directed to the event page! You can currently sort date-ascending and date-descending, but we're working hard on adding more features to make this card more robust. ",
            },
            {
              icon: "metric-chart",
              title: "Metrics",
              body: "Your whole year in financials, on a beautiful line chart. You can see each month's total, and how it compares to the next. Hover over a point on the chart to see the total for that month.",
            },
            {
              icon: "message-bubble",
              title: "Messaging",
              body: "Recent messages, in one convenient place. Click on a message to interact with that conversation and pull up the single messaging component.",
            },
            {
              icon: "calendar",
              title: "Calendar",
              body: "View a monthly calendar, navigate forward and backward, and even jump years. We have multiple years both ways capable, so don't be afraid to look forward or reminisce on the past.",
            },
          ],
        },
        contacts: {
          title: "Contacts Tab",
          icon: "group-people",
          body: " The real bread and butter of Spin (and Simple City Software's core product): contacts. We're currently working on making this easier to create, and other features that will make these easier to manage. believe that people are the key to success in any business, and this is where you'll manage them. The contacts tab allows you to view contacts sorted by type, add new contacts, and navigate to contact's specific pages. On desktop, you can use the tabs on the left to jump between categories, or simply scroll between the category cards.",
          cards: [
            {
              icon: "person",
              title: "Contact Page",
              body: "Contact management is key in any program. The contact page is where you'll be able to manage your contacts and react with them. You can fire off an email from one of your configured identities**, edit contact information, send messages in the in-app chat, view upcoming automations, and even view a list of all events the contact is associated with. The contact page is an incredibly userful tool in managing relationships and ensuring that you can stay on top of everything.",
              disclaimer: "**configurable in settings",
            },
            {
              icon: "person",
              title: "Contact Types",
              body: `Spin has several different contact types, allowing you, the 'Admin'
            to give finely-tuned access to your assets. These contact types will
            become more defined as the program progesses and we receive your
            feedback and develop more specific tools, but here is the intention
            behind the designations:
            <br />
            <br />
            Client: obviously, the people who the event is performed for. In
            some cases, a bride or groom, someone celebrating a birthday, or a
            manager for a corporate party.
            <br />
            <br />
            Organizer: think 'mother of a bride' or 'wedding planner'. An
            organizer is someone who doesn't particularly need (or should
            receive) full access. An organizer can still make payments, view
            forms, and contacts, but the separation is organizationally
            significant.
            <br />
            <br />
            Vendor: self-explanatory, a vendor is someone who is working
            alongside you on the day of. This will be more important in the
            future to compare notes, refer contacts back and forth and
            (eventually) better integrate portals for better sharing across
            platforms.
            <br />
            <br />
            Employee: these are your contractors or employees. Employees can see
            all information you can, including private notes. They can view
            locations, contact information, and are assignable to events from
            their own contact page.`,
            },
          ],
        },
        config: {
          title: "Config Tab",
          icon: "wrench-gear",
          body: "The config page is where things get a bit complicated. As we evolve, we hope to simplify this by taking more conntrol over what happens and when, and allow the program to be a bit more opinionated. For now, this is where you'll put your business settings and edit things like: branding and site colors, business info, product information, forms, and even build automations. This page will be built out more in the future, but for now, we feel as though we have a really solid foundation with which to build an amazing product.",
          cards: [
            {
              title: "Products",
              body: 'In config, you can customize and create new products such as "Add-Ons", "Packages", and "Services". The whole idea of this is to use Add-Ons and Services as your building blocks to build packages, then assign packages to events. You can also just simply assign Services and Add-Ons to events without creating packages, which may be easier for some companies and business models. Contracts, forms, and other config items are also attached to these entities to make your lives easier.',
            },
            {
              title: "Automations",
              body: "One of our most promising features, automations allow us to perform actions on your behalf. In its current form, it's limited to emails (action) triggered a specified amount of time after booking or before and after an event. As Spin grows, we plan to expand this to one of our key features, being able to add to-dos, manage contacts, and even handle other redundant tasks, freeing up more time for you.",
            },
            {
              title: "Contracts",
              body: "When booking an event, the client should sign a contract agreeing to your terms. You can create several different contracts and attach them to the package or service of your choice (in the product or service creation card). Your client can then sign the contract(s) on their portal in the event page. You can either design full-length contracts or micro-clauses and attach them to each applicable service, package, or event.",
            },
            {
              title: "Discounts",
              body: "You can add standard discounts here. Discounts have a name, a type (percentage or fixed amount), and an amount (10 = 10% / $10)",
            },
            {
              title: "Forms",
              body: "In forms, you can create standardized forms and attach them to packages or services. Your client can then fill the form out on their on the event page, and then you can see their answers on your side with the completed form. The forms are saved to that specific event, so changes to the form template in config won't affect their answers or forms. We're currently working on making this easier to create, and other features that will make these easier (and prettier) to manage.",
            },
            {
              title: "Identity",
              body: "One of the most requested features was branding-and-identity related. We're so excited about this, and know it'll only get better. We've been able to create global colors specified to your brand, and will have more options appear in the future. You can currently modify the background color, card color, card outline, text color, and highlight color. You'll see these scattered throughout the platform. In the identity tab, you can also set your business information, business logo, business name, and even more excitedly, custom 'spindj.io' emails and subdomains.",
            },
            {
              title: "Subdomains",
              body: "Nested inside the identity tab, subdomains is one of our most recent features, and one we're very excited about. Here, you can create and change your subdomain as your branding and brand changes in the future. You past two subdomains will remain active so that changing your subdomain and branding doesn't break your business and contact chain. You can also add email addresses under this tab for use throughout the portal. This is incredibly useful for sending one-off emails from your personal 'spindj.io' address, and automated emails from a 'system' address, for example. All emails are sent with a 'reply-to' address of your primary business email address. We plan on implementing mailboxes and more email funcntionality in the future.",
            },
            {
              title: "Payments",
              body: "Finally, the payments tab. The payments tab is where you'll be able to create your payment integrations.We currently have Stripe as the onnly credit card processor, but do plan on adding more. Creating and connecting a Stripe account from your portal is incredibly easy, and only takes a few minutes. Stripe takes a percentage of credit card payments for processing, and we don't touch your payments or take anything for these integrations. You can also add 'Check' instructions, and 'Custom' instructions. We have additional integrations planned in the future as well, such as additional credit card processors, P2P payments, and more.",
            },
          ],
        },
      },
    };
  },
  methods: {
    assignActiveTab(name) {
      document.getElementById(name + "-card").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      this.activeTab = name;
    },
    navigateToDashboard() {
      this.$router.push("/admin/dashboard");
    },
  },
  created() {},
  components: {},
  props: [],
};
</script>
<style scoped>
section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

.card-container {
  height: 85%;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
}

.inactive {
  opacity: 0.5;
}

.inactive p {
  color: #6b6b6b;
}

.inactive span {
  background-color: #6b6b6b;
}
.config-card {
  margin: 10px;
}
.heading > h1 {
  width: 100%;
  text-transform: uppercase;
  font-size: 2em;
  margin-bottom: 0;
  /* line-height: 2em; */
  font-weight: 600;
}

p {
  text-align: left;
  line-height: 2em;
  font-size: 10pt;
}

.full-width {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.half-width {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.scroll-wrapper {
  height: 100%;
  overflow: scroll;
}

.heading {
  height: 15%;
}

h1 {
  text-transform: uppercase;
  text-align: right;
  font-size: 2em;
  line-height: 2em;
  font-weight: 600;
  margin: 0;
}

h4 {
  text-transform: uppercase;
  text-align: right;
  font-size: 1em;
  line-height: 2em;
  font-weight: 600;
}
</style>
