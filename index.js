var Panel = Backbone.Model.extend({
  defaults: {
    kullanici: '',
    sifre: '',
    email: ''
  }
});

var PanelCollection = Backbone.Collection.extend({

});

var YeniPanelCollection = new PanelCollection();

var PanelView = Backbone.View.extend({
  model: new Panel(),
  tagName: 'tr',
  initialize: function() {
    this.olustur();
  },
  events: {
    'click .duzenle'   : 'duzenle',
    'click .sil'       : 'sil',
    'click .guncelle'  : 'guncelle',
    'click .kapat'     : 'kapat'
  },
  duzenle: function() {
    this.$('.duzenle').hide() & this.$('.sil').hide();
    this.$('.td-kullanici').hide() & this.$('.td-sifre').hide() & this.$('.td-email').hide();
    this.$('.guncelle').show() & this.$('.kapat').show();
    this.$('.td-kullanici-input').show() & this.$('.td-sifre-input').show() & 
this.$('.td-email-input').show();
  },
  sil: function() {
    var that = this;
    $('#myModal').modal('show');
    $('.delete-data').click(function() {
      $('#myModal').modal('hide');
      that.model.destroy();
    });
  },
  guncelle: function() {
    this.model.set({ kullanici: this.$('.td-kullanici-input').val(), sifre: this.$('.td-sifre-input').val(), email: this.$('.td-email-input').val() });
  },
  kapat: function() {
    this.$('.guncelle').hide() & this.$('.kapat').hide();
    this.$('.td-kullanici-input').hide() & this.$('.td-sifre-input').hide() & this.$('.td-email-input').hide();
    this.$('.duzenle').show() & this.$('.sil').show();
    this.$('.td-kullanici').show() & this.$('.td-sifre').show() & this.$('.td-email').show();
  },
  olustur: function() {
    var template = _.template( $('.kullanici-list-template').html() );
    this.$el.html( template( this.model.toJSON() ) );
    return this;
  }
});

var PanelYeniView = Backbone.View.extend({
  model: YeniPanelCollection,
  el: $('.kullanici-list'),
  initialize: function() {
    var self = this;
    this.render();
    this.model.on('add', function() {
      self.render();
    }, this);
    this.model.on('change', function() {
      setTimeout(function() {
        self.render();
      }, 15);
    }, this);
    this.model.on('remove', this.render, this);
  },
  render: function() {
    var self = this;
    this.$el.html('');
    _.each(this.model.toArray(), function(modellist) {
      self.$el.append((new PanelView({ model: modellist })).$el);
    });
    return this;
  }
});

$(function() {
  $('.ekle').click(function() {
    var Yeni_User = new Panel({
      kullanici: $('.kullanici').val(),
      sifre: $('.sifre').val(),
      email: $('.email').val()
    });

    YeniPanelCollection.add([Yeni_User]);

    var User_Yeni = new PanelYeniView();

    $('.kullanici').val('');
    $('.sifre').val('');
    $('.email').val('');
  });
});
