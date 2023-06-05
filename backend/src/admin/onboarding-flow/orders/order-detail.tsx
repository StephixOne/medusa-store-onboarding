import React from "react";

const OrderDetail = () => {
  return (
    <>
      <p className="text-sm">
        You finished the setup guide 🎉 You now have your first order. Feel free
        to play around with the order management functionalities, such as
        capturing payment, creating fulfillments, and more.
      </p>
      <h2 className="text-base mt-5 pt-5 pb-5 font-semibold text-black border-t border-gray-300 border-solid">
        Start developing with Medusa
      </h2>
      <p className="text-sm">
        This startup guide was entirely written in <strong>widgets</strong>{" "}
        located within your Medusa project. Edit the file to change the content
        of this widget. Medusa is a completely customizable commerce solution.
        We've curated some essential guides to kickstart your development with
        Medusa.
      </p>
      <div className="grid grid-cols-2 gap-4 mt-5 pb-5 mb-5 border-b border-gray-300 border-solid">
        <a href="#">
          <div className="p-5 border border-grey-20 rounded-rounded flex">
            <div></div>
            <div>
              <p className="font-semibold">Install Plugins</p>
              <p className="text-xs">
                Integrate payment providers, notification services, and more.
              </p>
            </div>
          </div>
        </a>
        <a href="#">
          <div className="p-5 border border-grey-20 rounded-rounded flex">
            <div></div>
            <div>
              <p className="font-semibold">Create Endpoints</p>
              <p className="text-xs">
                Add custom endpoints to Medusa's exposed APIs.
              </p>
            </div>
          </div>
        </a>
        <a href="#">
          <div className="p-5 border border-grey-20 rounded-rounded flex">
            <div></div>
            <div>
              <p className="font-semibold">Create Entities</p>
              <p className="text-xs">
                Add custom tables to the database and use them in your Medusa
                project.
              </p>
            </div>
          </div>
        </a>
        <a href="#">
          <div className="p-5 border border-grey-20 rounded-rounded flex">
            <div></div>
            <div>
              <p className="font-semibold">Listen to Events</p>
              <p className="text-xs">
                Perform asynchronous actions when an event occurs, such as when
                an order is placed.
              </p>
            </div>
          </div>
        </a>
      </div>
      <div>
        You can find more useful guides in{" "}
        <a href="#" className="text-blue-500">
          our documentation
        </a>
        .
      </div>
    </>
  );
};

export default OrderDetail;
