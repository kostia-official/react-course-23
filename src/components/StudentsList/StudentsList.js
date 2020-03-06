import React from "react";
import PropTypes from "prop-types";

import MaterialTable from "material-table";

export const StudentsList = ({
  students,
  title = "Список студентов",
  actions
}) => {
  return (
    <MaterialTable
      title={title}
      columns={[
        { title: "Имя", field: "name", width: 180 },
        { title: "Очки", field: "score", type: "numeric", defaultSort: "desc" }
      ]}
      data={students}
      options={{
        paging: false,
        search: false,
        actionsColumnIndex: -1
      }}
      localization={{
        header: {
          actions: ""
        },
        body: {
          emptyDataSourceMessage: "Пусто"
        }
      }}
      actions={actions}
    />
  );
};

StudentsList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  title: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};
