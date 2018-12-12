const clients = [
  {id: (Math.random() / +new Date()).toString(36).replace(/[^a-z]+/g, ''), name: 'Vlad', surname: 'Volynchuk', phone: +380955021030, email: 'volynchuk@gmail.com'},
  {id: (Math.random() / +new Date()).toString(36).replace(/[^a-z]+/g, ''), name: 'Eduard', surname: 'vccvcvvc', phone: +3453453454, email: '223232@gmail.com'},
  {id: (Math.random() / +new Date()).toString(36).replace(/[^a-z]+/g, ''), name: 'Oleg', surname: 'asdasd', phone: +5675756756, email: 'aasss@gmail.com'},
  {id: (Math.random() / +new Date()).toString(36).replace(/[^a-z]+/g, ''), name: 'Andrew', surname: 'fghghghgf', phone: +23423423423, email: 'fdffdfdfd@gmail.com'},
];

localStorage.setItem('clients', JSON.stringify(clients));

function findClient (clientId) {
  return clients[findClientKey(clientId)];
};

function findClientKey (clientId) {
  for (let key = 0; key < clients.length; key++) {
    if (clients[key].id == clientId) {
      return key;
    }
  }
};

const List = Vue.extend({
  template: '#clients-list',
  data: function () {
    return {clients: clients};
  },
  methods: {
    deleteClient: function (clientId) {
      clients.splice(findClientKey(clientId), 1);
      localStorage.setItem('clients', JSON.stringify(clients));
      console.log(JSON.parse(localStorage.clients))
    }
  }
});


const ClientEdit = Vue.extend({
  template: '#client-edit',
  data: function () {
    return {client: findClient(this.$route.params.client_id)};
  },
  methods: {
    updateClient: function () {
      const client = this.client;
      clients[findClientKey(client.id)] = {
        id: client.id,
        name: client.name,
        surname: client.surname,
        phone: client.phone,
        email: client.email
      };
      localStorage.setItem('clients', JSON.stringify(clients));
      router.push('/');
    }
  }
});

const AddClient = Vue.extend({
  template: '#add-client',
  data: function () {
    return {client: {name: '', surname: '', phone: '', email: ''}
    }
  },
  methods: {
    createClient: function() {
      const client = this.client;
      clients.push({
        id: (Math.random() / +new Date()).toString(36).replace(/[^a-z]+/g, ''),
        name: client.name,
        surname: client.surname,
        phone: client.phone,
        email: client.email
      });
      localStorage.setItem('clients', JSON.stringify(clients));
      router.push('/');
    },
    importClients: function (json) {
      JSON.parse(json).forEach( item => {        
        item.id = (Math.random() / +new Date()).toString(36).replace(/[^a-z]+/g, '');
        clients.push(item);
      });
      localStorage.setItem('clients', JSON.stringify(clients));
      router.push('/');
    }
  }

});

const router = new VueRouter({
  routes: [
    {path: '/', component: List},
    {path: '/add-client', component: AddClient},
    {path: '/:client_id/edit', component: ClientEdit, name: 'client-edit'}
  ]
});

new Vue({
  router
}).$mount('#app')