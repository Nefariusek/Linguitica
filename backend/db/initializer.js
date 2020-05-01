const bcrypt = require('bcryptjs');
const _ = require('lodash');

const defaultFlashcards = require('./defaultObjects/defaultFlashcards');

const transactional = (initializer) => async (model, models, idCatalog) => {
  let result;
  const session = await model.startSession();
  await session.withTransaction(async () => {
    result = await initializer(models, idCatalog);
  });

  return result;
};

const hashPassword = async (password) => await bcrypt.hash(password, await bcrypt.genSalt());

const createModelBatch = async (model, data) => {
  const createdDocuments = [];
  for (let modelData of data) {
    const createdDocument = new model(modelData);
    createdDocuments.push(createdDocument);
    await createdDocument.save();
  }
  const idArray = [];
  createdDocuments.forEach((element) => {
    idArray.push(element._id);
  });

  return idArray;
};

const arrayWithCount = (count) => (func) => [...Array(count).keys()].map(func);

const createFlashcards = async (amount, models) => {
  const flashcardData = arrayWithCount(amount)((x) => {
    if (defaultFlashcards[x] !== undefined) {
      return defaultFlashcards[x];
    } else {
      return {
        polish: 'polski' + x,
        german: 'das Deutsch' + x,
        polish_tips: 'podpowiedź' + x,
        german_tips: 'der Hinweis' + x,
        category: 'ogólne',
        tags: ['słówka', 'ogólne'],
        level: 'elementary',
      };
    }
  });

  return await createModelBatch(models.flashcard, flashcardData);
};

const createFlashsets = async (amount, models, flashcardCatalog) => {
  const Flashcard = models.flashcard;
  const flashsetData = arrayWithCount(amount)((x) => {
    flashcards = [];
    flashcards.push(flashcardCatalog[x] === undefined ? null : new Flashcard(defaultFlashcards[0]));
    return {
      flashcards,
    };
  });

  return await createModelBatch(models.flashset, flashsetData);
};

const createQuests = async (amount, models, flashsetCatalog) => {
  const questData = arrayWithCount(amount)((x) => {
    return {
      goal: 'muszę to zrobić',
      category: 'categoria',
      status: 'in_progress',
      duration: 10,
      description: 'jakiś opis questa',
      priority: 5,
      is_requrring: false,
      flashset_id: flashsetCatalog[x] === undefined ? null : flashsetCatalog[x],
    };
  });

  return await createModelBatch(models.quest, questData);
};

const createStatistics = async (amount, models, idCatalog) => {
  const statisticsData = arrayWithCount(amount)((x) => {
    return {
      words_learned: 10 + x,
      quest_completed: 2 + x,
      tests_passed: x,
      streak: 3 - x,
    };
  });

  return await createModelBatch(models.statistics, statisticsData);
};

const createPlants = async (amount, models, questCatalog, statisticsCatalog) => {
  const plantData = arrayWithCount(amount)((x) => {
    return {
      name: 'Plant_' + x,
      level: 5 + x,
      irrigation_points: 10,
      irrigation_required: 100,
      toughness: 5 + x,
      charmingness: 4 + x,
      health: 100 + x,
      max_health: 120 + x,
      quests: questCatalog[x] === undefined ? null : questCatalog[x],
      statistics_id: statisticsCatalog[x] === undefined ? null : statisticsCatalog[x],
    };
  });
  return await createModelBatch(models.plant, plantData);
};

const createUsers = async (amount, models, plantCatalog) => {
  //const password = await hashPassword()
  const userData = arrayWithCount(amount)((x) => {
    return {
      username: 'UserNumber' + x,
      email: `usernumber${x}@mail.com`,
      password: 'silne_haslo',
      plant_id: plantCatalog[x] === undefined ? null : plantCatalog[x],
    };
  });
  return await createModelBatch(models.user, userData);
};

const flashcardInitializer = async (models, idCatalog) => {
  return await createFlashcards(defaultFlashcards.length, models);
};

const flashsetInitializer = async (models, idCatalog) => {
  return await createFlashsets(5, models, idCatalog['flashcard']);
};

const questInitializer = async (models, idCatalog) => {
  return await createQuests(5, models, idCatalog['flashset']);
};

const statisticsInitializer = async (models, idCatalog) => {
  return await createStatistics(5, models);
};

const plantInitializer = async (models, idCatalog) => {
  return await createPlants(5, models, idCatalog['quest'], idCatalog['statistics']);
};

const userInitializer = async (models, idCatalog) => {
  return await createUsers(5, models, idCatalog['plant']);
};

const defaultInitializers = new Map([
  ['flashcard', flashcardInitializer],
  ['flashset', flashsetInitializer],
  ['quest', questInitializer],
  ['statistics', statisticsInitializer],
  ['plant', plantInitializer],
  ['user', userInitializer],
]);
const initializationOrder = ['flashcard', 'flashset', 'quest', 'statistics', 'plant', 'user'];
const initialize = async (models, initializers = defaultInitializers) => {
  let idCatalog = [];
  for (let modelName of initializationOrder) {
    if (!initializers.has(modelName)) {
      console.log(`[MongoDB] Initializer for ${modelName} not found.`);
      continue;
    }
    console.log(`[MongoDB] Initializing ${modelName}`);
    const initializer = initializers.get(modelName);
    idCatalog[modelName] = await transactional(initializer)(models[modelName], models, idCatalog);
  }
};

module.exports = initialize;
