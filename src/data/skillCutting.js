export const treesData = {
    '普通树': {
        name:'普通树',
        icon: require('@/assets/woodcutting/normal_tree.svg'),
        unlockLevel:1,
        masteryLevel:1,
        masteryExp:0,
        exp: 10,
        cutTime: 3,
        isActive: false,
        rewards: {
            '普通原木':{
                name: '普通原木',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 1,
                count: 1,
            },
            '鸟巢':{
                name: '鸟巢',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 0.005,
                count: 1,
            }
        },
        rewardIcon: require('@/assets/bank/logs_normal.png'),
    },
    '橡树': {
        name:'橡树',
        icon: require('@/assets/woodcutting/oak_tree.svg'),
        unlockLevel:10,
        masteryLevel:1,
        masteryExp:0,
        exp: 15,
        cutTime: 4,
        isActive: false,
        rewards: {
            '橡木':{
                name: '橡木',
                icon: require('@/assets/bank/logs_oak.png'),
                probability: 1,
                count: 1,
            },
            '鸟巢':{
                name: '鸟巢',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 0.005,
                count: 1,
            }
        },
    },
    '柳树': {
        name:'柳树',
        icon: require('@/assets/woodcutting/willow_tree.svg'),
        unlockLevel:25,
        masteryLevel:1,
        masteryExp:0,
        exp: 22,
        cutTime: 5,
        isActive: false,
        rewards: {
            '柳木':{
                name: '柳木',
                icon: require('@/assets/bank/logs_willow.png'),
                probability: 1,
                count: 1,
            },
            '鸟巢':{
                name: '鸟巢',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 0.005,
                count: 1,
            }
        },
    },
    '柚树': {
        name:'柚树',
        icon: require('@/assets/woodcutting/teak_tree.svg'),
        unlockLevel:35,
        masteryLevel:1,
        masteryExp:0,
        exp: 30,
        cutTime: 6,
        isActive: false,
        rewards: {
            '柚木':{
                name: '柚木',
                icon: require('@/assets/bank/logs_teak.png'),
                probability: 1,
                count: 1,
            },
            '鸟巢':{
                name: '鸟巢',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 0.005,
                count: 1,
            }
        },
    },
    '枫树': {
        name:'枫树',
        icon: require('@/assets/woodcutting/maple_tree.svg'),
        unlockLevel:45,
        masteryLevel:1,
        masteryExp:0,
        exp: 40,
        cutTime: 8,
        isActive: false,
        rewards: {
            '枫木':{
                name: '枫木',
                icon: require('@/assets/bank/logs_maple.png'),
                probability: 1,
                count: 1,
            },
            '鸟巢':{
                name: '鸟巢',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 0.005,
                count: 1,
            }
        },
    },
    '桃花芯树': {
        name:'桃花芯树',
        icon: require('@/assets/woodcutting/mahogany_tree.svg'),
        unlockLevel:55,
        masteryLevel:1,
        masteryExp:0,
        exp: 60,
        cutTime: 10,
        isActive: false,
        rewards: {
            '桃花芯木':{
                name: '桃花芯木',
                icon: require('@/assets/bank/logs_mahogany.png'),
                probability: 1,
                count: 1,
            },
            '鸟巢':{
                name: '鸟巢',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 0.005,
                count: 1,
            }
        },
    },
    '紫衫': {
        name:'紫衫',
        icon: require('@/assets/woodcutting/yew_tree.svg'),
        unlockLevel:60,
        masteryLevel:1,
        masteryExp:0,
        exp: 80,
        cutTime: 12,
        isActive: false,
        rewards: {
            '紫衫木':{
                name: '紫衫木',
                icon: require('@/assets/bank/logs_yew.png'),
                probability: 1,
                count: 1,
            },
            '鸟巢':{
                name: '鸟巢',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 0.005,
                count: 1,
            }
        },
    },
    '云杉': {
        name:'云杉',
        icon: require('@/assets/woodcutting/spruce_tree.svg'),
        unlockLevel:70,
        masteryLevel:1,
        masteryExp:0,
        exp: 100,
        cutTime: 15,
        isActive: false,
        rewards: {
            '云杉原木':{
                name: '云杉原木',
                icon: require('@/assets/bank/logs_spruce.png'),
                probability: 1,
                count: 1,
            },
            '鸟巢':{
                name: '鸟巢',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 0.005,
                count: 1,
            }
        },
    },
    '菩提树': {
        name:'菩提树',
        icon: require('@/assets/woodcutting/linden_tree.svg'),
        unlockLevel:80,
        masteryLevel:1,
        masteryExp:0,
        exp: 140,
        cutTime: 18,
        isActive: false,
        rewards: {
            '菩提原木':{
                name: '菩提原木',
                icon: require('@/assets/bank/logs_linden.png'),
                probability: 1,
                count: 1,
            },
            '鸟巢':{
                name: '鸟巢',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 0.005,
                count: 1,
            }
        },
    },
    '接骨木树': {
        name:'接骨木树',
        icon: require('@/assets/woodcutting/elderwood_tree.svg'),
        unlockLevel:85,
        masteryLevel:1,
        masteryExp:0,
        exp: 180,
        cutTime: 20,
        isActive: false,
        rewards: {
            '接骨木':{
                name: '接骨木',
                icon: require('@/assets/bank/logs_elderwood.png'),
                probability: 1,
                count: 1,
            },
            '鸟巢':{
                name: '鸟巢',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 0.005,
                count: 1,
            }
        },
    },
    '红木': {
        name:'红木',
        icon: require('@/assets/woodcutting/redwood_tree.svg'),
        unlockLevel:90,
        masteryLevel:1,
        masteryExp:0,
        exp: 195,
        cutTime: 22,
        isActive: false,
        rewards: {
            '红木':{
                name: '红木',
                icon: require('@/assets/bank/logs_redwood.png'),
                probability: 1,
                count: 1,
            },
            '鸟巢':{
                name: '鸟巢',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 0.005,
                count: 1,
            }
        },
    },
    '魔法树': {
        name:'魔法树',
        icon: require('@/assets/woodcutting/magic_tree.svg'),
        unlockLevel:95,
        masteryLevel:1,
        masteryExp:0,
        exp: 225,
        cutTime: 25,
        isActive: false,
        rewards: {
            '魔法原木':{
                name: '魔法原木',
                icon: require('@/assets/bank/logs_magic.png'),
                probability: 1,
                count: 1,
            },
            '鸟巢':{
                name: '鸟巢',
                icon: require('@/assets/bank/logs_normal.png'),
                probability: 0.005,
                count: 1,
            }
        },
    },
}