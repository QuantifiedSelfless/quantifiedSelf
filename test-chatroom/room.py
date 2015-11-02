class Room():
    def __init__(self, name, ID, owner):
        self.name = name
        self.ID = ID
        self.owner = owner
        self.people = []
        self.peoplelimit = 6
        self.status = "available"
        self.private = false
    def add_person(self, personID):
        if (self.status == "available"):
            self.people.append(personID)
    def remove_person(self, personID)
        for i in range(len(self.people)):
            if (self.people[i] == personID)
                self.people[i] = None
    def get_Person(self, personID):
        for i in range(len(self.people)):
            if (self.people[i] == personID):
                self.people[i] = None
    def is_available(self):
        return (self.status == "available")
    def is_private(self):
        return self.private

#module.exports = Room
