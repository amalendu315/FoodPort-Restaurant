import type { MenuCategory, MenuItem } from '@/types';

// Raw data from the user prompt
const MENU_DATA = {
    "categories": [
        "Veg Soup", "Non-Veg Soup", "Momos", "Chinese Veg (Starters)",
        "Chinese Veg (Noodles/Chowmien)", "Chinese Non-Veg", "Biryani", "Rolls",
        "Kababs", "Indian Snacks", "Dal", "Veg Indian", "Non-Veg Indian",
        "Rice Veg & Non Veg", "Roti & Paratha", "House Specials"
    ],
    "items": [
        {"category":"Veg Soup","name":"Veg Hot & Sour Soup","is_veg":true,"variants":[{"name":"Full","price":40}],"description":"Tangy-spicy veg soup."},
        {"category":"Veg Soup","name":"Veg Manchaw Soup","is_veg":true,"variants":[{"name":"Full","price":50}],"description":"Classic manchow soup."},
        {"category":"Veg Soup","name":"Veg Sweet Corn Soup","is_veg":true,"variants":[{"name":"Full","price":50}],"description":"Sweet corn with veggies."},
        {"category":"Veg Soup","name":"Veg Lemon Coriander Soup","is_veg":true,"variants":[{"name":"Full","price":65}],"description":"Zesty lemon-coriander soup."},
        {"category":"Non-Veg Soup","name":"Chicken Hot & Sour Soup","is_veg":false,"variants":[{"name":"Full","price":60}],"description":"Chicken, hot & sour."},
        {"category":"Non-Veg Soup","name":"Chicken Manchaw Soup","is_veg":false,"variants":[{"name":"Full","price":70}],"description":"Chicken manchow."},
        {"category":"Non-Veg Soup","name":"Chicken Sweet Corn Soup","is_veg":false,"variants":[{"name":"Full","price":70}],"description":"Chicken with sweet corn."},
        {"category":"Non-Veg Soup","name":"Chicken Lemon Coriander Soup","is_veg":false,"variants":[{"name":"Full","price":75}],"description":"Lemon-coriander chicken soup."},
        {"category":"Non-Veg Soup","name":"Chicken Clear Soup","is_veg":false,"variants":[{"name":"Full","price":80}],"description":"Light chicken broth."},
        {"category":"Momos","name":"Veg Steamed Momos (8 pcs)","is_veg":true,"variants":[{"name":"Full","price":50}],"description":"Steamed veg dumplings.","tags":["momo"]},
        {"category":"Momos","name":"Veg Fried Momos (8 pcs)","is_veg":true,"variants":[{"name":"Full","price":60}],"description":"Crispy fried veg momos.","tags":["momo"]},
        {"category":"Momos","name":"Veg Momo Chilli (8 pcs)","is_veg":true,"variants":[{"name":"Full","price":70}],"description":"Veg momos tossed in chilli sauce."},
        {"category":"Momos","name":"Paneer Steamed Momos (8 pcs)","is_veg":true,"variants":[{"name":"Full","price":70}],"description":"Paneer-stuffed steamed momos."},
        {"category":"Momos","name":"Paneer Fried Momos (8 pcs)","is_veg":true,"variants":[{"name":"Full","price":80}],"description":"Paneer momos, fried."},
        {"category":"Momos","name":"Paneer Momo Chilli (8 pcs)","is_veg":true,"variants":[{"name":"Full","price":90}],"description":"Paneer momos in chilli sauce."},
        {"category":"Momos","name":"Chicken Steamed Momos (8 pcs)","is_veg":false,"variants":[{"name":"Full","price":60}],"description":"Steamed chicken momos."},
        {"category":"Momos","name":"Chicken Fried Momos (8 pcs)","is_veg":false,"variants":[{"name":"Full","price":80}],"description":"Crispy fried chicken momos."},
        {"category":"Momos","name":"Chicken Momo Chilli (8 pcs)","is_veg":false,"variants":[{"name":"Full","price":90}],"description":"Chicken momos in chilli sauce."},
        {"category":"Chinese Veg (Starters)","name":"Paneer Manchurian","is_veg":true,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Crispy paneer in manchurian sauce."},
        {"category":"Chinese Veg (Starters)","name":"Paneer Salt & Pepper","is_veg":true,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Peppery fried paneer."},
        {"category":"Chinese Veg (Starters)","name":"Paneer 65","is_veg":true,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"South-style spicy paneer 65."},
        {"category":"Chinese Veg (Starters)","name":"Veg Manchurian","is_veg":true,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Veg balls in manchurian gravy."},
        {"category":"Chinese Veg (Starters)","name":"Honey Chilli Potato","is_veg":true,"variants":[{"name":"Half","price":60},{"name":"Full","price":120}],"description":"Crispy potato tossed in honey-chilli."},
        {"category":"Chinese Veg (Starters)","name":"Crispy Chilli Chana","is_veg":true,"variants":[{"name":"Half","price":60},{"name":"Full","price":120}],"description":"Crispy chickpeas tossed in chilli."},
        {"category":"Chinese Veg (Starters)","name":"Crispy Chilli Babycorn","is_veg":true,"variants":[{"name":"Half","price":70},{"name":"Full","price":130}],"description":"Crispy babycorn in chilli."},
        {"category":"Chinese Veg (Starters)","name":"Chilli Mushroom","is_veg":true,"variants":[{"name":"Half","price":70},{"name":"Full","price":120}],"description":"Mushrooms in chilli sauce."},
        {"category":"Chinese Veg (Starters)","name":"Mix Chinese Chilli","is_veg":true,"variants":[{"name":"Half","price":90},{"name":"Full","price":170}],"description":"Assorted veg in hot chilli sauce."},
        {"category":"Chinese Veg (Noodles/Chowmien)","name":"Veg Chowmien","is_veg":true,"variants":[{"name":"Half","price":50},{"name":"Full","price":80}],"description":"Street-style veg chowmien.","tags":["noodles"]},
        {"category":"Chinese Veg (Noodles/Chowmien)","name":"Paneer Chowmien","is_veg":true,"variants":[{"name":"Half","price":80},{"name":"Full","price":140}],"description":"Chowmien with paneer."},
        {"category":"Chinese Veg (Noodles/Chowmien)","name":"Mix Veg Chowmien","is_veg":true,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Loaded mixed veg noodles."},
        {"category":"Chinese Veg (Noodles/Chowmien)","name":"Veg Gravy Chowmien","is_veg":true,"variants":[{"name":"Half","price":60},{"name":"Full","price":100}],"description":"Chowmien with veg gravy."},
        {"category":"Chinese Veg (Noodles/Chowmien)","name":"Veg Schezwan Chowmien","is_veg":true,"variants":[{"name":"Half","price":60},{"name":"Full","price":100}],"description":"Schezwan spiced noodles."},
        {"category":"Chinese Veg (Noodles/Chowmien)","name":"Veg Pan Fried Noodles","is_veg":true,"variants":[{"name":"Full","price":150}],"description":"Crispy pan-fried noodles."},
        {"category":"Chinese Veg (Noodles/Chowmien)","name":"Veg American Chopsuey","is_veg":true,"variants":[{"name":"Full","price":160}],"description":"Crispy noodles with tangy sauce."},
        {"category":"Chinese Veg (Noodles/Chowmien)","name":"Paneer Chilli (Gravy/Dry)","is_veg":true,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Paneer tossed in chilli sauce."},
        {"category":"Chinese Non-Veg","name":"Chicken Chowmien","is_veg":false,"variants":[{"name":"Half","price":70},{"name":"Full","price":130}],"description":"Chicken noodles."},
        {"category":"Chinese Non-Veg","name":"Mix Non-Veg Chowmien","is_veg":false,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Mixed meats noodles."},
        {"category":"Chinese Non-Veg","name":"Chicken Gravy Chowmien","is_veg":false,"variants":[{"name":"Half","price":80},{"name":"Full","price":130}],"description":"Chowmien with chicken gravy."},
        {"category":"Chinese Non-Veg","name":"Chicken Schezwan Chowmien","is_veg":false,"variants":[{"name":"Half","price":80},{"name":"Full","price":130}],"description":"Schezwan chicken noodles."},
        {"category":"Chinese Non-Veg","name":"Chicken Pan Fried Noodles","is_veg":false,"variants":[{"name":"Full","price":150}],"description":"Crispy chicken noodles."},
        {"category":"Chinese Non-Veg","name":"Chicken Chopsuey","is_veg":false,"variants":[{"name":"Full","price":150}],"description":"Classic chicken chopsuey."},
        {"category":"Chinese Non-Veg","name":"Chicken Chilli (Gravy/Dry)","is_veg":false,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Hot garlic chilli chicken."},
        {"category":"Chinese Non-Veg","name":"Schezwan Chicken","is_veg":false,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Spicy schezwan chicken."},
        {"category":"Chinese Non-Veg","name":"Chicken Manchurian","is_veg":false,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Chicken in manchurian sauce."},
        {"category":"Chinese Non-Veg","name":"Chicken Salt & Pepper","is_veg":false,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Crispy pepper chicken."},
        {"category":"Chinese Non-Veg","name":"Chicken 65","is_veg":false,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"South-style chicken 65."},
        {"category":"Chinese Non-Veg","name":"Honey Chilli Chicken","is_veg":false,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Honey-chilli glaze."},
        {"category":"Chinese Non-Veg","name":"Crispy Chilli Chicken","is_veg":false,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Crispy fried chilli chicken."},
        {"category":"Chinese Non-Veg","name":"Lemon Chicken","is_veg":false,"variants":[{"name":"Half","price":100},{"name":"Full","price":180}],"description":"Tangy lemony chicken."},
        {"category":"Chinese Non-Veg","name":"Ginger Chicken","is_veg":false,"variants":[{"name":"Half","price":100},{"name":"Full","price":180}],"description":"Ginger flavoured chicken."},
        {"category":"Chinese Non-Veg","name":"Garlic Chicken","is_veg":false,"variants":[{"name":"Half","price":100},{"name":"Full","price":180}],"description":"Garlicky chicken."},
        {"category":"Biryani","name":"Veg Biryani","is_veg":true,"variants":[{"name":"Full","price":80}],"description":"Aromatic veg biryani."},
        {"category":"Biryani","name":"Kolkata Chicken Biryani","is_veg":false,"variants":[{"name":"Full","price":120}],"description":"Kolkata-style with potato."},
        {"category":"Biryani","name":"Hyderabadi Chicken Biryani","is_veg":false,"variants":[{"name":"Full","price":160}],"description":"Hyderabadi style biryani."},
        {"category":"Rolls","name":"Veg Roll","is_veg":true,"variants":[{"name":"Full","price":30}],"description":"Veg stuffing kathi roll."},
        {"category":"Rolls","name":"Egg Roll","is_veg":false,"variants":[{"name":"Full","price":40}],"description":"Egg layered roll."},
        {"category":"Rolls","name":"Chicken Roll","is_veg":false,"variants":[{"name":"Full","price":60}],"description":"Chicken kathi roll."},
        {"category":"Rolls","name":"Paneer Roll","is_veg":true,"variants":[{"name":"Full","price":60}],"description":"Paneer kathi roll."},
        {"category":"Rolls","name":"Lacha Veg Roll","is_veg":true,"variants":[{"name":"Full","price":60}],"description":"Lachha paratha veg roll."},
        {"category":"Rolls","name":"Lacha Egg Roll","is_veg":false,"variants":[{"name":"Full","price":70}],"description":"Lachha paratha egg roll."},
        {"category":"Rolls","name":"Lacha Chicken Roll","is_veg":false,"variants":[{"name":"Full","price":80}],"description":"Lachha paratha chicken roll."},
        {"category":"Rolls","name":"Lacha Paneer Roll","is_veg":true,"variants":[{"name":"Full","price":80}],"description":"Lachha paratha paneer roll."},
        {"category":"Rolls","name":"Veg Spring Roll","is_veg":true,"variants":[{"name":"Full","price":60}],"description":"Crispy veg spring roll."},
        {"category":"Rolls","name":"Chicken Spring Roll","is_veg":false,"variants":[{"name":"Full","price":80}],"description":"Crispy chicken spring roll."},
        {"category":"Kababs","name":"Chicken Pahari Kabab","is_veg":false,"variants":[{"name":"Full","price":200}],"description":"Herb-marinated kabab."},
        {"category":"Kababs","name":"Chicken Angara Kabab","is_veg":false,"variants":[{"name":"Full","price":200}],"description":"Smoky spicy kabab."},
        {"category":"Kababs","name":"Chicken Abu Chilli Kabab","is_veg":false,"variants":[{"name":"Full","price":220}],"description":"Special chilli kabab."},
        {"category":"Kababs","name":"Chicken Malai Tikka","is_veg":false,"variants":[{"name":"Full","price":220}],"description":"Creamy malai tikka."},
        {"category":"Kababs","name":"Chicken Tikka","is_veg":false,"variants":[{"name":"Half","price":110},{"name":"Full","price":200}],"description":"Classic tikka pieces."},
        {"category":"Kababs","name":"Chicken Reshmi Kabab","is_veg":false,"variants":[{"name":"Full","price":200}],"description":"Silky reshmi kabab."},
        {"category":"Kababs","name":"Tandoori Chicken","is_veg":false,"variants":[{"name":"Half","price":180},{"name":"Full","price":300}],"description":"Charred tandoori chicken."},
        {"category":"Kababs","name":"Chicken Seekh Kabab","is_veg":false,"variants":[{"name":"Half","price":120},{"name":"Full","price":200}],"description":"Seekh kabab."},
        {"category":"Kababs","name":"Chicken Achari","is_veg":false,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Pickled-spice flavour."},
        {"category":"Kababs","name":"Veg Hara Kabab","is_veg":true,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Spinach & herbs."},
        {"category":"Kababs","name":"Veg Seekh Kabab","is_veg":true,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Veg seekh kabab."},
        {"category":"Kababs","name":"Corn Tikki","is_veg":true,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Corn patties."},
        {"category":"Kababs","name":"Paneer Tikka","is_veg":true,"variants":[{"name":"Half","price":120},{"name":"Full","price":200}],"description":"Grilled paneer tikka."},
        {"category":"Kababs","name":"Mushroom Tikka","is_veg":true,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Tandoor mushrooms."},
        {"category":"Kababs","name":"Paneer Achari","is_veg":true,"variants":[{"name":"Half","price":120},{"name":"Full","price":200}],"description":"Achari paneer tikka."},
        {"category":"Indian Snacks","name":"Fish Finger (1 pc)","is_veg":false,"variants":[{"name":"Full","price":25}],"description":"Crispy fish finger."},
        {"category":"Indian Snacks","name":"Chicken Finger (1 pc)","is_veg":false,"variants":[{"name":"Full","price":30}],"description":"Crispy chicken finger."},
        {"category":"Indian Snacks","name":"Fish Cutlet (1 pc)","is_veg":false,"variants":[{"name":"Full","price":40}],"description":"Fish cutlet."},
        {"category":"Dal","name":"Yellow Dal Fry","is_veg":true,"variants":[{"name":"Half","price":70},{"name":"Full","price":120}],"description":"Tempered yellow dal."},
        {"category":"Dal","name":"Yellow Dal Tadka","is_veg":true,"variants":[{"name":"Half","price":70},{"name":"Full","price":120}],"description":"Tadka dal."},
        {"category":"Dal","name":"Egg Tadka","is_veg":false,"variants":[{"name":"Half","price":60},{"name":"Full","price":120}],"description":"Tadka dal with eggs."},
        {"category":"Veg Indian","name":"Mix Vegetable","is_veg":true,"variants":[{"name":"Half","price":60},{"name":"Full","price":120}],"description":"Seasonal mixed veg."},
        {"category":"Veg Indian","name":"Kashmiri Dum Aloo","is_veg":true,"variants":[{"name":"Half","price":50},{"name":"Full","price":100}],"description":"Dum cooked potatoes."},
        {"category":"Veg Indian","name":"Mushroom Masala","is_veg":true,"variants":[{"name":"Half","price":120},{"name":"Full","price":200}],"description":"Mushroom curry."},
        {"category":"Veg Indian","name":"Paneer Masala","is_veg":true,"variants":[{"name":"Half","price":120},{"name":"Full","price":200}],"description":"Paneer in masala gravy."},
        {"category":"Veg Indian","name":"Paneer Butter Masala","is_veg":true,"variants":[{"name":"Half","price":120},{"name":"Full","price":200}],"description":"Creamy tomato PBM."},
        {"category":"Veg Indian","name":"Kadhai Paneer","is_veg":true,"variants":[{"name":"Half","price":130},{"name":"Full","price":200}],"description":"Kadhai spices."},
        {"category":"Veg Indian","name":"Paneer Handi","is_veg":true,"variants":[{"name":"Half","price":140},{"name":"Full","price":200}],"description":"Handi style paneer."},
        {"category":"Veg Indian","name":"Paneer Lababdar","is_veg":true,"variants":[{"name":"Half","price":130},{"name":"Full","price":200}],"description":"Rich lababdar gravy."},
        {"category":"Veg Indian","name":"Paneer Malai Kofta (4 pcs)","is_veg":true,"variants":[{"name":"Full","price":180}],"description":"Malai kofta balls."},
        {"category":"Veg Indian","name":"Paneer Dopyaza","is_veg":true,"variants":[{"name":"Half","price":120},{"name":"Full","price":200}],"description":"Onion-forward paneer."},
        {"category":"Veg Indian","name":"Matar Paneer","is_veg":true,"variants":[{"name":"Half","price":80},{"name":"Full","price":160}],"description":"Peas & paneer."},
        {"category":"Veg Indian","name":"Palak Paneer","is_veg":true,"variants":[{"name":"Half","price":80},{"name":"Full","price":200}],"description":"Spinach & paneer."},
        {"category":"Veg Indian","name":"Chana Masala","is_veg":true,"variants":[{"name":"Half","price":80},{"name":"Full","price":150}],"description":"Chickpea curry."},
        {"category":"Non-Veg Indian","name":"Egg Curry","is_veg":false,"variants":[{"name":"Half","price":70},{"name":"Full","price":100}],"description":"Eggs in curry."},
        {"category":"Non-Veg Indian","name":"Fish Curry","is_veg":false,"variants":[{"name":"Full","price":180}],"description":"Fish in spicy gravy."},
        {"category":"Non-Veg Indian","name":"Chicken Kasa","is_veg":false,"variants":[{"name":"Half","price":100},{"name":"Full","price":200}],"description":"Dry-ish masala chicken."},
        {"category":"Non-Veg Indian","name":"Chicken Curry","is_veg":false,"variants":[{"name":"Half","price":120},{"name":"Full","price":200}],"description":"Homestyle chicken curry."},
        {"category":"Non-Veg Indian","name":"Chicken Masala","is_veg":false,"variants":[{"name":"Half","price":130},{"name":"Full","price":200}],"description":"Masala chicken."},
        {"category":"Non-Veg Indian","name":"Chicken Butter Masala","is_veg":false,"variants":[{"name":"Half","price":150},{"name":"Full","price":220}],"description":"Butter chicken style."},
        {"category":"Non-Veg Indian","name":"Kadhai Chicken","is_veg":false,"variants":[{"name":"Half","price":160},{"name":"Full","price":300}],"description":"Kadhai spices chicken."},
        {"category":"House Specials","name":"Chicken Lababdar","is_veg":false,"variants":[{"name":"Half","price":130},{"name":"Full","price":250}],"description":"Rich chicken lababdar."},
        {"category":"House Specials","name":"Chicken Handi (Boneless)","is_veg":false,"variants":[{"name":"Half","price":160},{"name":"Full","price":300}],"description":"Boneless handi chicken."},
        {"category":"House Specials","name":"Chicken Dehati","is_veg":false,"variants":[{"name":"Full","price":220}],"description":"Rustic spiced chicken."},
        {"category":"House Specials","name":"Murg Musallam","is_veg":false,"variants":[{"name":"Full","price":400}],"description":"Whole chicken delicacy."},
        {"category":"House Specials","name":"Foodport Special Jharkhandi Chicken (Clay Pot Family Pack)","is_veg":false,"variants":[{"name":"Full","price":1000}],"description":"Signature clay-pot special."},
        {"category":"Rice Veg & Non Veg","name":"Veg Fried Rice","is_veg":true,"variants":[{"name":"Half","price":60},{"name":"Full","price":100}],"description":"Veg fried rice."},
        {"category":"Rice Veg & Non Veg","name":"Egg Fried Rice","is_veg":false,"variants":[{"name":"Half","price":70},{"name":"Full","price":120}],"description":"Egg fried rice."},
        {"category":"Rice Veg & Non Veg","name":"Chicken Fried Rice","is_veg":false,"variants":[{"name":"Half","price":80},{"name":"Full","price":160}],"description":"Chicken fried rice."},
        {"category":"Rice Veg & Non Veg","name":"Mix Fried Rice (Veg/Non-Veg)","is_veg":false,"variants":[{"name":"Half","price":80},{"name":"Full","price":160}],"description":"Mixed fried rice."},
        {"category":"Rice Veg & Non Veg","name":"Jeera Rice","is_veg":true,"variants":[{"name":"Full","price":90}],"description":"Cumin rice."},
        {"category":"Rice Veg & Non Veg","name":"Triple Rice","is_veg":false,"variants":[{"name":"Full","price":160}],"description":"Rice + noodles + gravy combo."},
        {"category":"Rice Veg & Non Veg","name":"Schezwan Rice","is_veg":false,"variants":[{"name":"Half","price":80},{"name":"Full","price":160}],"description":"Schezwan spiced rice."},
        {"category":"Rice Veg & Non Veg","name":"Singapore Rice","is_veg":false,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Singaporean style rice."},
        {"category":"Rice Veg & Non Veg","name":"Vegetable Pulao","is_veg":true,"variants":[{"name":"Half","price":90},{"name":"Full","price":160}],"description":"Aromatic veg pulao."},
        {"category":"Rice Veg & Non Veg","name":"Green Peas Pulao","is_veg":true,"variants":[{"name":"Half","price":80},{"name":"Full","price":160}],"description":"Matar pulao."},
        {"category":"Rice Veg & Non Veg","name":"Veg Spring Rice","is_veg":true,"variants":[{"name":"Half","price":70},{"name":"Full","price":130}],"description":"Spring onion rice."},
        {"category":"Rice Veg & Non Veg","name":"Chicken Spring Rice","is_veg":false,"variants":[{"name":"Half","price":90},{"name":"Full","price":180}],"description":"Chicken spring onion rice."},
        {"category":"Rice Veg & Non Veg","name":"Mix Spring Rice (Veg/Non-Veg)","is_veg":false,"variants":[{"name":"Half","price":110},{"name":"Full","price":200}],"description":"Mixed spring rice."},
        {"category":"Roti & Paratha","name":"Tawa Roti","is_veg":true,"variants":[{"name":"Full","price":7}],"description":"Phulka style roti."},
        {"category":"Roti & Paratha","name":"Tandoori Roti","is_veg":true,"variants":[{"name":"Full","price":15}],"description":"Tandoori roti."},
        {"category":"Roti & Paratha","name":"Tandoori Butter Roti","is_veg":true,"variants":[{"name":"Full","price":20}],"description":"Butter tandoori roti."},
        {"category":"Roti & Paratha","name":"Plain Naan","is_veg":true,"variants":[{"name":"Full","price":30}],"description":"Plain naan."},
        {"category":"Roti & Paratha","name":"Butter Naan","is_veg":true,"variants":[{"name":"Full","price":40}],"description":"Butter naan."},
        {"category":"Roti & Paratha","name":"Garlic Naan","is_veg":true,"variants":[{"name":"Full","price":50}],"description":"Garlic naan."},
        {"category":"Roti & Paratha","name":"Masala Kulcha","is_veg":true,"variants":[{"name":"Full","price":50}],"description":"Stuffed kulcha."},
        {"category":"Roti & Paratha","name":"Chicken Mughlai Paratha","is_veg":false,"variants":[{"name":"Full","price":80}],"description":"Stuffed paratha."},
        {"category":"Roti & Paratha","name":"Egg Mughlai Paratha","is_veg":false,"variants":[{"name":"Full","price":80}],"description":"Egg stuffed paratha."},
        {"category":"Indian Snacks","name":"Chicken Cutlet (1 pc)","is_veg":false,"variants":[{"name":"Half","price":40},{"name":"Full","price":80}],"description":"Crispy chicken cutlet."},
        {"category":"Indian Snacks","name":"Egg Devil (1 pc)","is_veg":false,"variants":[{"name":"Half","price":20},{"name":"Full","price":40}],"description":"Stuffed egg snack."},
        {"category":"Indian Snacks","name":"Egg Pakoda (8 pcs)","is_veg":false,"variants":[{"name":"Full","price":80}],"description":"Egg fritters."},
        {"category":"Indian Snacks","name":"Chicken Pakoda (8 pcs)","is_veg":false,"variants":[{"name":"Full","price":150}],"description":"Chicken fritters."},
        {"category":"Indian Snacks","name":"Paneer Pakoda (8 pcs)","is_veg":true,"variants":[{"name":"Full","price":150}],"description":"Paneer fritters."}
    ]
};

// Process the raw data
export const menuCategories: MenuCategory[] = MENU_DATA.categories.map((name, index) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    return {
        id: slug,
        name,
        sort_order: index,
    };
});

const categoryMap = new Map(menuCategories.map(cat => [cat.name, cat.id]));

function getVegType(item: { name: string; is_veg: boolean }): 'veg' | 'egg' | 'chicken' | 'fish' {
    if (!item.is_veg) {
        const lowerCaseName = item.name.toLowerCase();
        if (lowerCaseName.includes('chicken')) return 'chicken';
        if (lowerCaseName.includes('fish') || lowerCaseName.includes('prawn')) return 'fish';
        if (lowerCaseName.includes('egg')) return 'egg';
    }
    return 'veg';
}


export const menuItems: MenuItem[] = MENU_DATA.items.map((item, index) => {
    const category_id = categoryMap.get(item.category) || '';
    const category_slug = category_id;
    const base_price = Math.min(...item.variants.map(v => v.price));
    const name_lc = item.name.toLowerCase();
    const veg_type = getVegType(item);

    return {
        id: `item${index + 1}`,
        category_id,
        name: item.name,
        is_veg: item.is_veg,
        description: item.description,
        image_url: 'https://placehold.co/600x400.png',
        variants: item.variants,
        is_available: true, // Default to true, can be changed in admin
        // Derived fields for filtering/sorting
        category_slug,
        base_price,
        name_lc,
        veg_type,
        popularity_score: Math.random() * 100, // Placeholder
        created_at: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    };
});
