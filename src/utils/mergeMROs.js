
export const mergeMROs = (data) => {

    let dataResult = [];

    for (let i = 0; i < data.length; i++) {

        const id_this = data[i].id;
        const name_this = data[i].fields.name;
        const capability_type_this = data[i].fields.capability_type;
        const ac_type_this = data[i].fields.ac_type;
        const engine_type_this = data[i].fields.engine_type;
        // const etops_this = data[i].fields.etops;
        const person_this = data[i].fields.person;
        const department_this = data[i].fields.department;
        const number_this = data[i].fields.contact;
        const email_this = data[i].fields.email;
        const latitude_this = data[i].fields.latitude;
        const longitude_this = data[i].fields.longitude;

        if (name_this in dataResult) {

            let repeated_contact = false;
            for (let c = 0; c < dataResult[name_this].contacts.length; c++) {
                const contact_previous = dataResult[name_this].contacts[c];
                if (contact_previous.person === person_this) {
                    repeated_contact = true;
                }
            }
            if (!repeated_contact) {
                dataResult[name_this].contacts.push(
                    {
                        person: person_this,
                        department: department_this,
                        number: number_this,
                        email: email_this,
                    }
                );
            }

            if (!(capability_type_this in dataResult[name_this].capability_type)) {
                dataResult[name_this].capability_type.push(capability_type_this)
            }
            if (!(ac_type_this in dataResult[name_this].capability_type)) {
                dataResult[name_this].ac_type.push(ac_type_this)
            }
            if (!(engine_type_this in dataResult[name_this].engine_type)) {
                dataResult[name_this].engine_type.push(engine_type_this)
            }

            // dataResult[name_this].etops = dataResult[name_this].etops || etops_this
        }
        else {
            dataResult[name_this] = {
                id: id_this,
                latitude: latitude_this,
                longitude: longitude_this,
                contacts: [
                    {
                        person: person_this,
                        department: department_this,
                        number: number_this,
                        email: email_this,
                    }
                ],
                capability_type: [capability_type_this],
                ac_type: [ac_type_this],
                engine_type: [engine_type_this],
                // etops: etops_this
            }
        }
    }

    const dataResultTransformed = Object.entries(dataResult).map(([name_this, value_this]) => {
        return {
            id: value_this.id,
            fields: {
                name: name_this,
                latitude: value_this.latitude,
                longitude: value_this.longitude,
                capability_type: value_this.capability_type,
                ac_type: value_this.ac_type,
                engine_type: value_this.engine_type,
                contacts: value_this.contacts,
                // etops: value_this.etops
            }
        }
    })

    return dataResultTransformed;
}