type User = {
    id: number,
    username: string,
    settings?: {notifications?: boolean},
}

function isNotified(user: User): boolean{

    //Check if settings exists
    if(!user.settings)
        return false;

    //Return notifications, or false when it's missing.
    return user.settings.notifications ?? false;
}

// User 1
const userWithNotification: User = {
    id: 1,
    username: "User1",
    settings: {notifications: true},
}

// User 2
const userWithNoSettings: User = {
    id: 2,
    username: "User2",
}

//User 3
const userWithNoNotifications : User = {
    id: 3,
    username: "User3",
    settings: {},
}

console.log("User1 | expected: true  | actual:", isNotified(userWithNotification));
console.log("User2 | expected: false | actual:", isNotified(userWithNoSettings));
console.log("User3 | expected: false | actual:", isNotified(userWithNoNotifications));