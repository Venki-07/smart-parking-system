const jwt =
    require("jsonwebtoken");

const connectDB =
    require("./db");

const {
    ObjectId
} = require("mongodb");


function authenticate(req) {

    const header =
        req.headers.authorization;

    if (!header) {
        return null;
    }

    const token =
        header.split(" ")[1];

    try {

        return jwt.verify(
            token,
            process.env.JWT_SECRET
        );

    } catch {

        return null;

    }

}


module.exports = async function handler(
    req,
    res
) {

    try {

        const db =
            await connectDB();


        /* GET PARKING */

        if (req.method === "GET") {

            const parking =
                await db.collection(
                    "parking"
                )
                .find({
                    isOpen: true
                })
                .toArray();


            return res.json(parking);

        }


        /* ADD PARKING */

        if (req.method === "POST") {

            const user =
                authenticate(req);


            if (!user) {

                return res.status(401)
                    .json({

                        message:
                            "Login required"

                    });

            }


            if (user.role !== "owner") {

                return res.status(403)
                    .json({

                        message:
                            "Owner account required"

                    });

            }


            const {

                name,
                address,
                city,
                totalSlots,
                availableSlots,
                price,
                latitude,
                longitude

            } = req.body;


            await db.collection("parking")
                .insertOne({

                    ownerId:
                        user.id,

                    name,

                    address,

                    city,

                    totalSlots,

                    availableSlots,

                    price,

                    latitude,

                    longitude,

                    isOpen: true,

                    createdAt:
                        new Date()

                });


            return res.status(201)
                .json({

                    message:
                        "Parking place added successfully"

                });

        }


        return res.status(405)
            .json({

                message:
                    "Method not allowed"

            });


    } catch (error) {

        console.error(error);

        return res.status(500)
            .json({

                message:
                    "Server error"

            });

    }

};
