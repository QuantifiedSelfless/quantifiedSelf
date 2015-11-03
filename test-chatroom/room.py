class Room():
    def __init__(self, peoplelimit):
        self.people = []
        self.peoplelimit = peoplelimit
        self.status = True
    def add_person(self, personID):
        self.people.append(personID)
        if (len(self.people) == self.peoplelimit):
            self.status = False    
    def remove_person(self, personID):
        for i in range(len(self.people)):
            if (self.people[i] == personID):
                self.people[i] = None
    def status(self):
        return self.status
