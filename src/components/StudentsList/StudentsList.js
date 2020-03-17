import React from "react";
import MaterialTable from "material-table";
import { ControlledInput } from "../ControlledInput/ControlledInput";

export const StudentsList = ({
  students,
  title = "Список студентов",
  actions,
  onScoreUpdate
}) => {
  return (
    <MaterialTable
      title={title}
      columns={[
        { title: "Имя", field: "name", width: 180 },
        {
          title: "Очки",
          field: "score",
          type: "numeric",
          defaultSort: "desc",
          render: ({ id, score }) => {
            return (
              <ControlledInput
                key={id}
                type="number"
                value={score}
                onValueUpdate={value => {
                  onScoreUpdate(id, Number(value) - score);
                }}
              />
            );
          }
        }
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
