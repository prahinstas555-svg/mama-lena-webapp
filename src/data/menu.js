const menuData = [
  {
    id: 'breakfast',
    name: 'Завтраки',
    icon: '🍳',
    items: [
      { id: 1, name: 'Каша овсяная с бананами', weight: '300 мл', price: 320 },
      { id: 2, name: 'Шакшука из 3х яиц', weight: '320 г', price: 380 },
      { id: 3, name: 'Скрембл с ветчиной и шампиньонами', weight: '270 г', price: 360 },
      { id: 4, name: 'Сырники с бананом и грецкими орехами', weight: '4 шт', price: 380 },
      { id: 5, name: 'Завтрак Хемингуэйа', weight: '300 г', price: 550 },
      { id: 6, name: 'Блины с творогом', weight: '3 шт', price: 310 },
      { id: 7, name: 'Блины Мама Лена с вареньем', weight: '3 шт', price: 280 },
      { id: 8, name: 'Блины с крымским мёдом', weight: '3 шт', price: 280 },
      { id: 9, name: 'Блины с курицей и грибами со сметаной', weight: '3 шт', price: 380 },
    ]
  },
  {
    id: 'cold',
    name: 'Холодные закуски',
    icon: '🥗',
    items: [
      { id: 10, name: 'Нежнейший домашний паштет «Мама Лена»', weight: '100 г', price: 450 },
      { id: 11, name: 'Форшмак рубленный от шефа', weight: '310 г', price: 600 },
      { id: 12, name: 'Селёдочка с картошкой', weight: '200 г', price: 450 },
      { id: 13, name: 'Рыбная нарезка из малосольного лосося', weight: '180 г', price: 1200 },
      { id: 14, name: 'Сало собственного посола с подчеревком', weight: '300 г', price: 800 },
      { id: 15, name: 'Соленья из погребка', weight: '500 г', price: 520 },
      { id: 16, name: 'Сырное ассорти', weight: '250 г', price: 1100 },
      { id: 17, name: 'Мясное плато собственного приготовления', weight: '300 г', price: 1100 },
      { id: 18, name: 'Рулетики из слабосолёного лосося', weight: '150 г', price: 900 },
    ]
  },
  {
    id: 'hot-appetizers',
    name: 'Горячие закуски',
    icon: '🍟',
    items: [
      { id: 19, name: 'Драники с слабосолёным лососем и соусом дорблю', weight: '300 г', price: 820 },
      { id: 20, name: 'Сырные палочки во фритюре', weight: '200 г', price: 450 },
    ]
  },
  {
    id: 'salads',
    name: 'Салаты',
    icon: '🥬',
    items: [
      { id: 21, name: 'Салат с карамелизированными баклажанами и страчателлой', weight: '230 г', price: 560 },
      { id: 22, name: 'Селёдка «под шубой»', weight: '300 г', price: 400 },
      { id: 23, name: 'Греческий', weight: '200 г', price: 450 },
      { id: 24, name: 'Цезарь с курицей', weight: '200 г', price: 420 },
      { id: 25, name: 'Цезарь с креветкой', weight: '200 г', price: 510 },
      { id: 26, name: 'Цезарь с слабосолёным лососем', weight: '200 г', price: 610 },
      { id: 27, name: 'Оливье с запечённой курицей', weight: '200 г', price: 400 },
      { id: 28, name: 'Салат «дары моря»', weight: '280 г', price: 650 },
      { id: 29, name: 'Оливье с креветкой', weight: '200 г', price: 600 },
      { id: 30, name: 'Тёплый салат из телятины со спаржевой фасолью', weight: '200 г', price: 560 },
    ]
  },
  {
    id: 'soups',
    name: 'Первые блюда',
    icon: '🍲',
    items: [
      { id: 31, name: 'Борщ от шефа с гренками и салом', weight: '300 г', price: 450 },
      { id: 32, name: 'Крем-суп из шампиньонов', weight: '300 г', price: 500 },
      { id: 33, name: 'Уха по-фински с лососем и треской', weight: '300 г', price: 620 },
      { id: 34, name: 'Том ям', weight: '420 г', price: 610 },
      { id: 35, name: 'Сырный крем-суп', weight: '250 г', price: 450 },
      { id: 36, name: 'Суп-пюре из красной чечевицы с беконом', weight: '300 г', price: 450 },
      { id: 37, name: 'Суп-лапша с перепёлкой', weight: '300 г', price: 450 },
      { id: 38, name: 'Бульон из перепёлки с фрикадельками', weight: '300 г', price: 450 },
    ]
  },
  {
    id: 'main',
    name: 'Основные блюда',
    icon: '🥩',
    items: [
      { id: 39, name: 'Медальоны из телятины с винным конфи', weight: '200 г', price: 950 },
      { id: 40, name: 'Филе миньон с овощами гриль и перечным соусом', weight: '100 г', price: 590 },
      { id: 41, name: 'Пожарские котлеты с пюре и квашеной капустой', weight: '320 г', price: 590 },
      { id: 42, name: 'Стейк из свинины с картофелем по-деревенски', weight: '250 г', price: 690 },
      { id: 43, name: 'Стейк из курицы сювид с соусом дор-блю', weight: '250 г', price: 510 },
      { id: 44, name: 'Запечённая утка с булгуром и пармезаном', weight: '320 г', price: 610 },
      { id: 45, name: 'Стейк из сёмги на гриле', weight: '100 г', price: 600 },
    ]
  },
  {
    id: 'pans',
    name: 'Сковородки',
    icon: '🍳',
    items: [
      { id: 46, name: 'Сковородка из курицы с овощами', weight: '250 г', price: 500 },
      { id: 47, name: 'Сковородка из телятины с овощами', weight: '300 г', price: 610 },
      { id: 48, name: 'Сковородка из филе трески с моцареллой', weight: '320 г', price: 650 },
    ]
  },
  {
    id: 'sides',
    name: 'Гарниры',
    icon: '🍚',
    items: [
      { id: 49, name: 'Красная чечевица с томатами и белым вином', weight: '240 г', price: 310 },
      { id: 50, name: 'Пюре картофельное', weight: '250 г', price: 290 },
      { id: 51, name: 'Картофель по-домашнему с грибами и луком', weight: '200 г', price: 310 },
      { id: 52, name: 'Фри с пармезаном и кетчупом', weight: '200 г', price: 300 },
    ]
  },
  {
    id: 'pasta',
    name: 'Пасты',
    icon: '🍝',
    items: [
      { id: 53, name: 'Фрутто ди Маре', weight: '290 г', price: 610 },
      { id: 54, name: 'Спагетти с тигровой креветкой и кальмаром', weight: '280 г', price: 600 },
      { id: 55, name: 'Карбонара', weight: '280 г', price: 490 },
      { id: 56, name: 'Болоньезе', weight: '280 г', price: 520 },
    ]
  },
  {
    id: 'bowls',
    name: 'Боулы',
    icon: '🥗',
    items: [
      { id: 57, name: 'Поке с слабосолёным лососем и авокадо', weight: '340 г', price: 620 },
      { id: 58, name: 'Поке с цыплёнком и киноа', weight: '320 г', price: 590 },
    ]
  },
  {
    id: 'grill',
    name: 'Мангал',
    icon: '🔥',
    items: [
      { id: 59, name: 'Люля-кебаб из индейки с моцареллой', weight: '290 г', price: 550 },
      { id: 60, name: 'Люля-кебаб из говядины', weight: '100 г', price: 420 },
      { id: 61, name: 'Люля-кебаб из индейки', weight: '100 г', price: 390 },
      { id: 62, name: 'Кюфта из телятины с моцареллой и зеленью', weight: '300 г', price: 610 },
      { id: 63, name: 'Шашлык из говядины', weight: '100 г', price: 490 },
      { id: 64, name: 'Шашлык из свинины', weight: '100 г', price: 450 },
      { id: 65, name: 'Шашлык из бедра курицы без кости', weight: '100 г', price: 350 },
      { id: 66, name: 'Скумбрия на мангале с мини картофелем', weight: '1 шт', price: 600 },
      { id: 67, name: 'Овощи на гриле', weight: '200 г', price: 600 },
      { id: 68, name: 'Шампиньоны с паприкой', weight: '4 шт', price: 250 },
      { id: 69, name: 'Мини картофель в мундире с салом', weight: '150 г', price: 290 },
      { id: 70, name: 'Лаваш с моцареллой и помидором', weight: '1 шт', price: 310 },
    ]
  },
  {
    id: 'pizza',
    name: 'Пицца',
    icon: '🍕',
    items: []
  },
  {
    id: 'burgers',
    name: 'Бургеры',
    icon: '🍔',
    items: [
      { id: 71, name: 'Бургер с мраморной говядиной', weight: '', price: 510 },
      { id: 72, name: 'Бургер с курицей', weight: '', price: 490 },
    ]
  },
  {
    id: 'kids',
    name: 'Детское меню',
    icon: '👶',
    items: [
      { id: 73, name: 'Детская паста с мини фрикадельками', weight: '220 г', price: 450 },
      { id: 74, name: 'Макароны с сыром пармезан', weight: '200 г', price: 390 },
      { id: 75, name: 'Макароны «Бантики» с детскими сосисками', weight: '200 г', price: 360 },
      { id: 76, name: 'Сырный крем-суп', weight: '250 г', price: 450 },
      { id: 77, name: 'Куриный супчик с лапшей', weight: '200 г', price: 400 },
      { id: 78, name: 'Куриный бульон с фрикадельками', weight: '250 г', price: 420 },
      { id: 79, name: 'Котлетки из курочки с пюре', weight: '', price: 550 },
      { id: 80, name: 'Мини пельмешки со сметаной', weight: '250 г', price: 390 },
      { id: 81, name: 'Мини бургеры с котлетой из курочки', weight: '2 шт', price: 450 },
    ]
  },
  {
    id: 'banquet',
    name: 'Банкетные блюда',
    icon: '🎉',
    items: []
  },
  {
    id: 'promos',
    name: 'Акции',
    icon: '🏷️',
    items: []
  },
  {
    id: 'desserts',
    name: 'Десерты',
    icon: '🍰',
    items: []
  },
]

export default menuData

export const categories = menuData
  .filter(cat => cat.items.length > 0)
  .map(cat => ({ id: cat.id, name: cat.name, icon: cat.icon }))

export const menuItems = menuData
  .flatMap(cat => cat.items.map(item => ({ ...item, category: cat.id })))
